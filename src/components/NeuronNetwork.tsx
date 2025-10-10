// okkk final
import { useEffect, useRef } from "react";

const neuronCount = 100;
const connectionDistance = 200;
const mouseConnectionDistance = 150;

interface ParticleType {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  life: number;
  color: string;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

interface NeuronType {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  life: number;
  isRemoving: boolean;
  isConnected: boolean;
  removalTarget?: { x: number; y: number };
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  remove: () => void;
  connect: () => void;
  disconnect: () => void;
}

// Utility to interpolate between two colors (hex strings)
function lerpColor(a: string, b: string, t: number) {
  const ah = a.replace("#", "");
  const bh = b.replace("#", "");
  const ar = parseInt(ah.substring(0, 2), 16);
  const ag = parseInt(ah.substring(2, 4), 16);
  const ab = parseInt(ah.substring(4, 6), 16);
  const br = parseInt(bh.substring(0, 2), 16);
  const bg = parseInt(bh.substring(2, 4), 16);
  const bb = parseInt(bh.substring(4, 6), 16);
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `rgb(${rr},${rg},${rb})`;
}

// Find nearest boundary point for a neuron
function getNearestBoundary(x: number, y: number, width: number, height: number) {
  const left = x;
  const right = width - x;
  const top = y;
  const bottom = height - y;
  const minDist = Math.min(left, right, top, bottom);

  if (minDist === left) return { x: 0, y };
  if (minDist === right) return { x: width, y };
  if (minDist === top) return { x, y: 0 };
  return { x, y: height };
}

const NeuronNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const neuronsRef = useRef<NeuronType[]>([]);
  const connectedNeuronsRef = useRef<NeuronType[]>([]);
  const particlesRef = useRef<ParticleType[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Create a particle
  function createParticle(x: number, y: number, target: { x: number; y: number }): ParticleType {
    const angle = Math.atan2(target.y - y, target.x - x);
    const speed = 2 + Math.random() * 3;
    
    const particle: Partial<ParticleType> = {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.random() * 1.5 + 0.5,
      opacity: 0.8 + Math.random() * 0.2,
      life: 1,
      color: (() => { const base = [0,182,189]; const v = Math.floor(Math.random()*40)-20; return `rgb(${base[0]},${Math.min(255,Math.max(0,base[1]+v))},${Math.min(255,Math.max(0,base[2]+v))})`; })(), // cyan-teal variations
    };

    particle.update = function() {
      this.x! += this.vx!;
      this.y! += this.vy!;
      this.life! -= 0.015;
      this.opacity! = this.life! * 0.8;
    };

    particle.draw = function(ctx: CanvasRenderingContext2D) {
      if (this.life! <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.opacity!;
      ctx.beginPath();
      ctx.arc(this.x!, this.y!, this.radius!, 0, Math.PI * 2);
      ctx.fillStyle = this.color!;
      ctx.fill();
      ctx.restore();
    };

    return particle as ParticleType;
  }

  // Create explosion particles when a neuron is removed
  function createExplosionParticles(x: number, y: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Create particles moving to four boundaries
    const targets = [
      { x: 0, y: y },                 // left
      { x: width, y: y },            // right
      { x: x, y: 0 },                // top
      { x: x, y: height }             // bottom
    ];
    
    for (const target of targets) {
      particlesRef.current.push(createParticle(x, y, target));
    }
  }

  // Create a neuron with all methods
  function createNeuron(): NeuronType {
    const neuron: Partial<NeuronType> = {
      x: Math.random() * (canvasRef.current?.width || 1),
      y: Math.random() * (canvasRef.current?.height || 1),
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: Math.random() * 1 + 1.5,
      opacity: Math.random() * 0.3 + 0.7,
      life: 1,
      isRemoving: false,
      isConnected: false,
    };

    neuron.update = function () {
      if (neuron.isRemoving && neuron.removalTarget) {
        // Move toward boundary
        const dx = neuron.removalTarget.x - neuron.x!;
        const dy = neuron.removalTarget.y - neuron.y!;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = 4;
        if (dist > speed) {
          neuron.x! += (dx / dist) * speed;
          neuron.y! += (dy / dist) * speed;
        } else {
          neuron.x = neuron.removalTarget.x;
          neuron.y = neuron.removalTarget.y;
        }
        neuron.life! -= 0.03;
        if (neuron.life! <= 0) neuron.life = 0;
      } else {
        // Normal movement
        if (neuron.isConnected) {
          const dx = mouseRef.current.x - neuron.x!;
          const dy = mouseRef.current.y - neuron.y!;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 30) {
            neuron.vx = dx * 0.05;
            neuron.vy = dy * 0.05;
          } else {
            neuron.vx! *= 0.9;
            neuron.vy! *= 0.9;
          }
        }
        neuron.x! += neuron.vx!;
        neuron.y! += neuron.vy!;

        const w = canvasRef.current?.width || 1;
        const h = canvasRef.current?.height || 1;
        if (neuron.x! < 0) neuron.x = w;
        if (neuron.x! > w) neuron.x = 0;
        if (neuron.y! < 0) neuron.y = h;
        if (neuron.y! > h) neuron.y = 0;
      }

      // Speed limit
      const speed = Math.sqrt(neuron.vx! * neuron.vx! + neuron.vy! * neuron.vy!);
      if (speed > 2) {
        neuron.vx = (neuron.vx! / speed) * 2;
        neuron.vy = (neuron.vy! / speed) * 2;
      }
    };

    neuron.draw = function (ctx: CanvasRenderingContext2D) {
      if (neuron.life! <= 0) return;
      ctx.save();
      ctx.globalAlpha = neuron.opacity! * neuron.life!;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(0,182,189,0.7)"; // cyan-teal glow
      ctx.beginPath();
      ctx.arc(neuron.x!, neuron.y!, neuron.radius!, 0, Math.PI * 2);
      ctx.fillStyle = neuron.isConnected
        ? "rgba(0,182,189,0.95)"
        : "rgba(0,182,189,0.8)";
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.globalAlpha = (neuron.opacity! * neuron.life!) * 0.9;
      ctx.beginPath();
      ctx.arc(neuron.x!, neuron.y!, neuron.radius! * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = neuron.isConnected ? "rgba(0,182,189,1)" : "white";
      ctx.fill();
      ctx.restore();
    };

    neuron.remove = function () {
      if (!neuron.isRemoving) {
        neuron.isRemoving = true;
        const canvas = canvasRef.current;
        if (canvas) {
          neuron.removalTarget = getNearestBoundary(neuron.x!, neuron.y!, canvas.width, canvas.height);
        }
        // Create explosion particles
        createExplosionParticles(neuron.x!, neuron.y!);
      }
    };

    neuron.connect = function () {
      if (!neuron.isConnected && connectedNeuronsRef.current.length < 6) {
        neuron.isConnected = true;
        connectedNeuronsRef.current.push(neuron as NeuronType);
      }
    };

    neuron.disconnect = function () {
      neuron.isConnected = false;
      connectedNeuronsRef.current = connectedNeuronsRef.current.filter(
        (n) => n !== neuron
      );
    };

    return neuron as NeuronType;
  }

  function initNeurons() {
    const neurons: NeuronType[] = [];
    for (let i = 0; i < neuronCount; i++) {
      neurons.push(createNeuron());
    }
    neuronsRef.current = neurons;
    connectedNeuronsRef.current = [];
    particlesRef.current = [];
  }

  function drawConnections(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.lineWidth = 0.8;
    for (let i = 0; i < neuronsRef.current.length; i++) {
      for (let j = i + 1; j < neuronsRef.current.length; j++) {
        const a = neuronsRef.current[i];
        const b = neuronsRef.current[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDistance) {
          const t = dist / connectionDistance;
          ctx.strokeStyle = lerpColor("#ffffff", "#00b6bd", t);
          let opacity = ((connectionDistance - dist) / connectionDistance) * 0.7;
          opacity *= a.life * b.life;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.lineWidth = 1.2;
    connectedNeuronsRef.current.forEach((neuron) => {
      if (neuron.life > 0) {
        const dx = neuron.x - mouseRef.current.x;
        const dy = neuron.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const t = Math.min(dist / mouseConnectionDistance, 1);
        ctx.strokeStyle = lerpColor("#ffffff", "#00b6bd", t);
        let opacity = ((mouseConnectionDistance - dist) / mouseConnectionDistance) * 0.95;
        opacity *= neuron.life;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.moveTo(neuron.x, neuron.y);
        ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
        ctx.stroke();
      }
    });
    ctx.restore();
  }

  function updateConnections() {
    connectedNeuronsRef.current.forEach((neuron) => {
      const dx = neuron.x - mouseRef.current.x;
      const dy = neuron.y - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > mouseConnectionDistance * 1.5) {
        neuron.disconnect();
      }
    });
    if (connectedNeuronsRef.current.length < 6) {
      const closest = neuronsRef.current
        .filter((n) => !n.isConnected && n.life > 0)
        .sort((a, b) => {
          const da = Math.sqrt((a.x - mouseRef.current.x) ** 2 + (a.y - mouseRef.current.y) ** 2);
          const db = Math.sqrt((b.x - mouseRef.current.y) ** 2 + (b.y - mouseRef.current.y) ** 2);
          return da - db;
        });
      for (
        let i = 0;
        i < Math.min(6 - connectedNeuronsRef.current.length, closest.length);
        i++
      ) {
        const neuron = closest[i];
        const dist = Math.sqrt(
          (neuron.x - mouseRef.current.x) ** 2 + (neuron.y - mouseRef.current.y) ** 2
        );
        if (dist < mouseConnectionDistance) {
          neuron.connect();
        }
      }
    }
  }

  function animate() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateConnections();

    // Update particles
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      particlesRef.current[i].update();
      if (particlesRef.current[i].life <= 0) {
        particlesRef.current.splice(i, 1);
      }
    }

    // Update neurons
    for (let i = neuronsRef.current.length - 1; i >= 0; i--) {
      neuronsRef.current[i].update();
      if (neuronsRef.current[i].life <= 0 && neuronsRef.current[i].isRemoving) {
        neuronsRef.current.splice(i, 1);
      }
    }

    drawConnections(ctx);

    // Draw particles
    particlesRef.current.forEach((particle) => particle.draw(ctx));

    // Draw neurons
    neuronsRef.current.forEach((neuron) => neuron.draw(ctx));

    // Maintain neuron count
    while (neuronsRef.current.length < neuronCount) {
      neuronsRef.current.push(createNeuron());
    }

    animationRef.current = requestAnimationFrame(animate);
  }

  function resizeCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    initNeurons();
    animationRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      neuronsRef.current.forEach((neuron) => {
        const dx = neuron.x - e.clientX;
        const dy = neuron.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          neuron.remove();
        }
      });
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        background: "radial-gradient(circle at center, rgba(0,182,189,0.18), rgba(2,8,12,0.95))",
        display: "block",
      }}
    />
  );
};

export default NeuronNetwork;
