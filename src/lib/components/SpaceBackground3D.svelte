<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let container: HTMLDivElement;

  onMount(() => {
    // ۱. ساخت صحنه، دوربین و رندرکننده
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ۲. ساخت ذرات کهکشان (Stars)
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const geometry = new THREE.BufferGeometry();

    for(let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // ساخت متریال ذرات (نورانی و نرم)
    const material = new THREE.PointsMaterial({
      size: 0.03,
      color: '#818cf8', // رنگ نیلی هماهنگ با تم سایت
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 3;

    // ۳. انیمیشن و تعامل با ماوس
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // چرخش ملایم خودکار + تاثیر ماوس روی کهکشان
      points.rotation.y += 0.001;
      points.rotation.x += 0.0005;

      points.rotation.y += (mouseX * 0.2 - points.rotation.y) * 0.05;
      points.rotation.x += (mouseY * 0.2 - points.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // تنظیم سایز در صورت تغییر اندازه پنجره
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  });
</script>

<div bind:this={container} class="absolute inset-0 z-0 pointer-events-none overflow-hidden"></div>