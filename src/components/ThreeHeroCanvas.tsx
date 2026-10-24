import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeroCanvasProps {
  userScale?: number;
}

export const ThreeHeroCanvas: React.FC<ThreeHeroCanvasProps> = ({ userScale = 1.0 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const userScaleRef = useRef(userScale);

  useEffect(() => {
    userScaleRef.current = userScale;
  }, [userScale]);

  useEffect(() => {
    // Large screens only (>= 1024px)
    if (window.innerWidth < 1024) return;

    const container = mountRef.current;
    if (!container) return;

    // Detect software GL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Scene & Camera setup
    const scene = new THREE.Scene();
    
    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x6366f1, 2.8); // Indigo key
    keyLight.position.set(6, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x10b981, 2.2); // Emerald rim
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xf59e0b, 1.6, 12); // Amber warm fill
    fillLight.position.set(0, -4, 4);
    scene.add(fillLight);

    // Master Mascot Group
    const mascotGroup = new THREE.Group();
    scene.add(mascotGroup);

    // 1. Mascot Body (Smooth, friendly pearl-indigo sphere)
    const bodyGeo = new THREE.SphereGeometry(1.2, 36, 36);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      roughness: 0.18,
      metalness: 0.25,
      flatShading: false
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    mascotGroup.add(bodyMesh);

    // 2. Cute Anime / Mascot Eyes
    const eyeGeo = new THREE.SphereGeometry(0.18, 20, 20);
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.1,
      metalness: 0.8
    });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.scale.set(0.9, 1.3, 0.7);
    leftEye.position.set(-0.35, 0.18, 1.05);
    mascotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.scale.set(0.9, 1.3, 0.7);
    rightEye.position.set(0.35, 0.18, 1.05);
    mascotGroup.add(rightEye);

    // Specular Glints
    const glintGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const leftGlint = new THREE.Mesh(glintGeo, glintMat);
    leftGlint.position.set(-0.31, 0.26, 1.16);
    mascotGroup.add(leftGlint);

    const rightGlint = new THREE.Mesh(glintGeo, glintMat);
    rightGlint.position.set(0.39, 0.26, 1.16);
    mascotGroup.add(rightGlint);

    // Cute Blushing Cheeks
    const blushGeo = new THREE.CircleGeometry(0.16, 16);
    const blushMat = new THREE.MeshBasicMaterial({
      color: 0xf472b6,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide
    });

    const leftBlush = new THREE.Mesh(blushGeo, blushMat);
    leftBlush.position.set(-0.55, -0.05, 1.03);
    leftBlush.rotation.y = -Math.PI / 10;
    mascotGroup.add(leftBlush);

    const rightBlush = new THREE.Mesh(blushGeo, blushMat);
    rightBlush.position.set(0.55, -0.05, 1.03);
    rightBlush.rotation.y = Math.PI / 10;
    mascotGroup.add(rightBlush);

    // 3. Cute Graduation Cap (Achievement accessory)
    const capTopGeo = new THREE.BoxGeometry(0.95, 0.05, 0.95);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x312e81,
      roughness: 0.3,
      metalness: 0.2
    });
    const capTop = new THREE.Mesh(capTopGeo, capMat);
    capTop.position.set(0, 1.25, 0);
    capTop.rotation.y = Math.PI / 4;
    capTop.rotation.z = -Math.PI / 32;
    mascotGroup.add(capTop);

    const capBaseGeo = new THREE.CylinderGeometry(0.45, 0.5, 0.2, 24);
    const capBase = new THREE.Mesh(capBaseGeo, capMat);
    capBase.position.set(0, 1.15, 0);
    mascotGroup.add(capBase);

    // Golden Tassel
    const tasselGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 8);
    const tasselMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.1,
      metalness: 0.8
    });
    const tassel = new THREE.Mesh(tasselGeo, tasselMat);
    tassel.position.set(0.38, 1.05, 0.38);
    tassel.rotation.z = Math.PI / 6;
    mascotGroup.add(tassel);

    // 4. Orbiting Skill Satellites (Steady calm orbits)
    // Orbit 1: Emerald React Code Cube
    const cubeGeo = new THREE.BoxGeometry(0.36, 0.36, 0.36);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.2,
      metalness: 0.4
    });
    const cubeNode = new THREE.Mesh(cubeGeo, cubeMat);
    mascotGroup.add(cubeNode);

    // Orbit 2: Rose Figma Design Diamond
    const octaGeo = new THREE.OctahedronGeometry(0.28, 0);
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      roughness: 0.25,
      metalness: 0.35
    });
    const octaNode = new THREE.Mesh(octaGeo, octaMat);
    mascotGroup.add(octaNode);

    // Orbit 3: Amber Freelancing Gold Token
    const coinGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.08, 20);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.15,
      metalness: 0.9
    });
    const coinNode = new THREE.Mesh(coinGeo, coinMat);
    mascotGroup.add(coinNode);

    // Soft Orbital Ring
    const orbitRingGeo = new THREE.TorusGeometry(2.1, 0.015, 16, 64);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0xc7d2fe,
      transparent: true,
      opacity: 0.4
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 3;
    orbitRing.rotation.y = Math.PI / 10;
    mascotGroup.add(orbitRing);

    // 5. Smooth Catmull-Rom Spline Curve strictly through alternating empty side corridors
    // Left sections have open space on the Right (X = +2.85)
    // Right sections have open space on the Left (X = -2.85)
    const splineWaypoints = [
      new THREE.Vector3(2.85, 0.10, 0.0),   // Point 0: Hero (Right Empty Flank)
      new THREE.Vector3(-2.85, -0.05, 0.0), // Point 1: About (Left Empty Flank)
      new THREE.Vector3(2.85, 0.10, 0.0),   // Point 2: Methodology (Right Empty Flank)
      new THREE.Vector3(-2.85, -0.05, 0.0), // Point 3: Tracks (Left Empty Flank)
      new THREE.Vector3(2.85, 0.10, 0.0),   // Point 4: Testimonials (Right Empty Flank)
      new THREE.Vector3(-2.85, -0.05, 0.0)  // Point 5: CTA (Left Empty Flank)
    ];

    const splineCurve = new THREE.CatmullRomCurve3(splineWaypoints, false, 'catmullrom', 0.5);

    // Initial position at spline start
    mascotGroup.position.copy(splineWaypoints[0]);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      targetMouseX = x * 1.5;
      targetMouseY = y * 1.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Window Resize Handler
    const handleResize = () => {
      if (window.innerWidth < 1024) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Steady Orbit Angle Accumulator (Calm & steady, zero scroll jumps)
    let orbitPhase = 0;

    // Direct Section Scroll Offset Progress Calculation (Synchronized with 6 section corridors)
    const calculateSplineTFromSections = (): number => {
      const hero = document.getElementById('section-hero');
      const about = document.getElementById('section-about');
      const methodology = document.getElementById('section-methodology');
      const tracks = document.getElementById('section-tracks');
      const testimonials = document.getElementById('section-testimonials');
      const cta = document.getElementById('section-cta');

      if (!hero || !about) {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        return Math.min(1, Math.max(0, window.scrollY / maxScroll));
      }

      const scrollY = window.scrollY;
      const heroY = 0;
      const aboutY = Math.max(100, about.offsetTop - window.innerHeight * 0.35);
      const methodologyY = methodology ? Math.max(aboutY + 200, methodology.offsetTop - window.innerHeight * 0.35) : aboutY + 800;
      const tracksY = tracks ? Math.max(methodologyY + 200, tracks.offsetTop - window.innerHeight * 0.35) : methodologyY + 800;
      const testimonialsY = testimonials ? Math.max(tracksY + 200, testimonials.offsetTop - window.innerHeight * 0.35) : tracksY + 800;
      const ctaY = cta ? Math.max(testimonialsY + 200, cta.offsetTop - window.innerHeight * 0.45) : testimonialsY + 800;

      // 5 smooth step intervals mapping across the 6 waypoints
      if (scrollY <= heroY) {
        return 0;
      } else if (scrollY < aboutY) {
        const u = (scrollY - heroY) / (aboutY - heroY);
        return (u * u * (3 - 2 * u)) * 0.2;
      } else if (scrollY < methodologyY) {
        const u = (scrollY - aboutY) / (methodologyY - aboutY);
        return 0.2 + (u * u * (3 - 2 * u)) * 0.2;
      } else if (scrollY < tracksY) {
        const u = (scrollY - methodologyY) / (tracksY - methodologyY);
        return 0.4 + (u * u * (3 - 2 * u)) * 0.2;
      } else if (scrollY < testimonialsY) {
        const u = (scrollY - tracksY) / (testimonialsY - tracksY);
        return 0.6 + (u * u * (3 - 2 * u)) * 0.2;
      } else {
        const u = Math.min(1, Math.max(0, (scrollY - testimonialsY) / Math.max(100, ctaY - testimonialsY)));
        return 0.8 + (u * u * (3 - 2 * u)) * 0.2;
      }
    };

    // Reusable math vector for spline evaluation (zero GC allocation)
    const splinePos = new THREE.Vector3();

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX = THREE.MathUtils.damp(mouseX, targetMouseX, 4, delta);
      mouseY = THREE.MathUtils.damp(mouseY, targetMouseY, 4, delta);

      // 1. Evaluate Direct Spline Parameter t in [0, 1] from Section Scroll
      const t = calculateSplineTFromSections();
      splineCurve.getPoint(t, splinePos);

      // 2. Idle breathing bob + subtle mouse parallax (mascot stays cleanly in empty corridor)
      const breathingBob = Math.sin(elapsed * 1.8) * 0.05;
      const finalX = splinePos.x + mouseX * 0.3;
      const finalY = splinePos.y + breathingBob - mouseY * 0.3;
      const finalZ = splinePos.z;

      // Gentle natural breathing scale (fits comfortably in empty margin)
      const targetScale = 0.96 + Math.sin(elapsed * 1.4) * 0.03;

      // 3. Silky Smooth Exponential Dampening
      mascotGroup.position.x = THREE.MathUtils.damp(mascotGroup.position.x, finalX, 3.2, delta);
      mascotGroup.position.y = THREE.MathUtils.damp(mascotGroup.position.y, finalY, 3.2, delta);
      mascotGroup.position.z = THREE.MathUtils.damp(mascotGroup.position.z, finalZ, 3.2, delta);

      const currentScale = mascotGroup.scale.x;
      const newScale = THREE.MathUtils.damp(currentScale, targetScale, 3.5, delta);
      mascotGroup.scale.set(newScale, newScale, newScale);

      // 4. Mascot Natural Banking & Tilt
      // Bank gently along X velocity / curve direction + look towards cursor
      const targetRotY = mouseX * 0.5 + Math.sin(elapsed * 0.7) * 0.1;
      const targetRotX = -mouseY * 0.35 + Math.cos(elapsed * 0.5) * 0.06;
      const targetRotZ = -THREE.MathUtils.clamp((finalX - mascotGroup.position.x) * 0.6, -0.2, 0.2); // banking tilt

      mascotGroup.rotation.y = THREE.MathUtils.damp(mascotGroup.rotation.y, targetRotY, 4, delta);
      mascotGroup.rotation.x = THREE.MathUtils.damp(mascotGroup.rotation.x, targetRotX, 4, delta);
      mascotGroup.rotation.z = THREE.MathUtils.damp(mascotGroup.rotation.z, targetRotZ, 3.5, delta);

      // 5. Steady, Calm Orbiting Satellites (Delta-based, ZERO velocity spikes)
      orbitPhase += 0.75 * delta;

      // React Code Cube
      cubeNode.position.set(
        Math.cos(orbitPhase) * 2.1,
        Math.sin(orbitPhase) * 0.85,
        Math.sin(orbitPhase) * 1.6
      );
      cubeNode.rotation.x += 1.2 * delta;
      cubeNode.rotation.y += 1.0 * delta;

      // Figma Design Diamond
      const angle2 = orbitPhase * 0.9 + 2.09;
      octaNode.position.set(
        Math.sin(angle2) * 2.2,
        Math.cos(angle2) * 1.05,
        Math.cos(angle2) * 1.5
      );
      octaNode.rotation.y += 1.5 * delta;

      // Freelancing Coin
      const angle3 = orbitPhase * 0.78 + 4.18;
      coinNode.position.set(
        Math.cos(angle3) * 2.3,
        -Math.sin(angle3) * 0.85,
        Math.sin(angle3) * 1.8
      );
      coinNode.rotation.x += 1.3 * delta;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      bodyGeo.dispose();
      bodyMat.dispose();
      eyeGeo.dispose();
      eyeMat.dispose();
      glintGeo.dispose();
      glintMat.dispose();
      blushGeo.dispose();
      blushMat.dispose();
      capTopGeo.dispose();
      capBaseGeo.dispose();
      capMat.dispose();
      tasselGeo.dispose();
      tasselMat.dispose();
      cubeGeo.dispose();
      cubeMat.dispose();
      octaGeo.dispose();
      octaMat.dispose();
      coinGeo.dispose();
      coinMat.dispose();
      orbitRingGeo.dispose();
      orbitRingMat.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="hidden lg:block fixed inset-0 pointer-events-none z-10 select-none overflow-hidden" 
      aria-hidden="true"
    />
  );
};
