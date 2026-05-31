/* ─── 1. 이미지 모달 스크립트 ─── */
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalTargetImg');
const closeBtn = document.getElementById('modalClose');
const clickableImages = document.querySelectorAll('.clickable-img');

clickableImages.forEach(img => {
  img.addEventListener('click', function() {
    modal.style.display = 'flex'; 
    modalImg.src = this.src;
    modalImg.alt = this.alt;
    document.body.style.overflow = 'hidden';
  });
});

closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
});

modal.addEventListener('click', function(e) {
  if (e.target === modal || e.target.classList.contains('modal-wrapper')) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

/* ─── 2. 이메일 클립보드 복사 & 토스트 팝업 ─── */
const copyEmailBtn = document.getElementById('copyEmailBtn');
const toastBox = document.getElementById('toastBox');
let toastTimeout;

copyEmailBtn.addEventListener('click', () => {
  const emailText = copyEmailBtn.innerText;
  
  navigator.clipboard.writeText(emailText).then(() => {
    clearTimeout(toastTimeout);
    toastBox.classList.add('show');
    toastTimeout = setTimeout(() => {
      toastBox.classList.remove('show');
    }, 2000);
  }).catch(err => {
    console.error('클립보드 복사 실패: ', err);
  });
});

/* ─── 3. 어바웃 히어로: 평행우주 효과 ─── */
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  const container = canvas.parentElement;

  let width = canvas.width = container.offsetWidth;
  let height = canvas.height = container.offsetHeight;

  let mouseActive = false;
  let warpFactor = 1.0; 

  window.addEventListener('resize', () => {
    width = canvas.width = container.offsetWidth;
    height = canvas.height = container.offsetHeight;
  });

  container.addEventListener('mousemove', () => { mouseActive = true; });
  container.addEventListener('mouseleave', () => { mouseActive = false; });

  const stars = [];
  const numStars = width > 768 ? 220 : 110;
  
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 2000,
      orbitRadius: Math.random() * 180 + 20,
      orbitSpeed: (Math.random() - 0.5) * 0.015,
      orbitAngle: Math.random() * Math.PI * 2,
      size: Math.random() * 1.5 + 0.5
    });
  }

  function drawUniverse() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)'; 
    ctx.fillRect(0, 0, width, height);

    let cx = width / 2;
    let cy = height / 2;

    if (mouseActive) {
      warpFactor += (18.0 - warpFactor) * 0.08;
    } else {
      warpFactor += (1.0 - warpFactor) * 0.05;
    }

    stars.forEach(star => {
      star.orbitAngle += star.orbitSpeed;
      let orbitX = Math.cos(star.orbitAngle) * star.orbitRadius;
      let orbitY = Math.sin(star.orbitAngle) * star.orbitRadius;

      star.z -= warpFactor * 3.5;
      if (star.z <= 0) {
        star.z = 2000;
        star.x = (Math.random() - 0.5) * 2000;
        star.y = (Math.random() - 0.5) * 2000;
      }

      let k = 400 / star.z;
      let px = (star.x + orbitX) * k + cx;
      let py = (star.y + orbitY) * k + cy;

      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        let size = star.size * k * 1.2;
        let alpha = Math.min(1, (2000 - star.z) / 400);

        if (warpFactor > 3.0) {
          ctx.strokeStyle = `rgba(234, 234, 234, ${alpha * 0.35})`;
          ctx.lineWidth = size * 0.4;
          ctx.beginPath();
          ctx.moveTo(px, py);
          let oldK = 400 / (star.z + warpFactor * 12);
          let opx = (star.x + orbitX) * oldK + cx;
          let opy = (star.y + orbitY) * oldK + cy;
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(234, 234, 234, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.5, size), 0, Math.PI * 2);
        ctx.fill();
      }
    });

    requestAnimationFrame(drawUniverse);
  }
  drawUniverse();
});

/* ─── 4. 컨택트 섹션: 뇌신경망 애니메이션 ─── */
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('contactCanvas');
  const ctx = canvas.getContext('2d');
  const section = canvas.parentElement;

  let width = canvas.width = section.offsetWidth;
  let height = canvas.height = section.offsetHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = section.offsetWidth;
    height = canvas.height = section.offsetHeight;
  });

  const particles = [];
  const maxParticles = width > 768 ? 45 : 22;
  const connectionDist = 120; 

  for (let i = 0; i < maxParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.42,
      radius: Math.random() * 2.0 + 1.2 
    });
  }

  function drawNeuralNetwork() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.fillStyle = 'rgba(177, 177, 177, 0.95)'; 
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let p1 = particles[i];
        let p2 = particles[j];
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          let alpha = (1 - dist / connectionDist) * 0.4; 
          ctx.strokeStyle = `rgba(177, 177, 177, ${alpha})`; 
          ctx.lineWidth = 0.9; 
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawNeuralNetwork);
  }
  drawNeuralNetwork();
});
