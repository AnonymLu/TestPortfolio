document.addEventListener("DOMContentLoaded", () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threejs-container').appendChild(renderer.domElement);

    const createServerRack = () => {
        const rack = new THREE.Group();
        for (let i = 0; i < 5; i++) {
            const server = new THREE.Mesh(
                new THREE.BoxGeometry(2, 0.5, 1),
                new THREE.MeshPhongMaterial({
                    color: 0x1a1a1a,
                    emissive: 0x00ff88,
                    emissiveIntensity: 0.2
                })
            );
            server.position.y = i * 0.6;
            rack.add(server);
        }
        return rack;
    };

    const particles = new THREE.Group();
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff88 });

    for (let i = 0; i < 500; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.set(
            Math.random() * 40 - 20,
            Math.random() * 40 - 20,
            Math.random() * 40 - 20
        );
        particles.add(particle);
    }

    const serverRack1 = createServerRack();
    serverRack1.position.set(-8, 0, -20);
    scene.add(serverRack1);

    const serverRack2 = createServerRack();
    serverRack2.position.set(8, 0, -20);
    scene.add(serverRack2);

    scene.add(particles);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 10, 10);
    scene.add(light);

    function animate() {
        requestAnimationFrame(animate);
        serverRack1.rotation.y += 0.005;
        serverRack2.rotation.y -= 0.005;
        particles.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".navbar", {
        top: 0,
        opacity: 1,
        delay: 2,
        duration: 1,
        ease: "power4.out"
    });

    gsap.utils.toArray("section").forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%"
            },
            opacity: 0,
            y: 100,
            duration: 1
        });

        section.addEventListener("mouseenter", () => {
            gsap.to(section, { scale: 1.02, duration: 0.3 });
        });

        section.addEventListener("mouseleave", () => {
            gsap.to(section, { scale: 1, duration: 0.3 });
        });

        section.addEventListener("click", () => {
            gsap.to(section, { scale: 0.98, duration: 0.2, yoyo: true, repeat: 1 });
        });
    });

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    document.querySelector('.navbar').prepend(menuToggle);

    menuToggle.addEventListener('click', () => {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('active');

        setTimeout(() => {
            menuToggle.innerHTML = navbar.classList.contains('active') ? '✖' : '☰';
        }, 135);
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const navbar = document.querySelector('.navbar');
            navbar.classList.remove('active');
            setTimeout(() => { menuToggle.innerHTML = '☰'; }, 135);
        });
    });

    window.validateForm = function () {
        var recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            alert("Bitte bestätigen Sie, dass Sie kein Roboter sind.");
        } else {
            document.getElementById("myForm").submit();
        }
    };
});
// Alte version / Old version.
/*document.addEventListener("DOMContentLoaded", () => {
    const navHeight = document.querySelector(".navbar").offsetHeight + 20;
    const extraOffset = 40;

    function scrollToSection(targetId, addExtraOffset = false) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offset = addExtraOffset ? navHeight + extraOffset : navHeight;
            const targetPosition = targetElement.offsetTop - offset;
            window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
    }

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            scrollToSection(targetId, false);
        });
    });

    window.addEventListener("load", () => {
        const urlHash = window.location.hash.substring(1);
        if (urlHash) {
            setTimeout(() => {
                scrollToSection(urlHash, true); 
            }, 300);
        }
    });
});*/
document.addEventListener("DOMContentLoaded", () => {
    const navHeight = document.querySelector(".navbar").offsetHeight + 20;
    const extraOffset = 40;
    const adjustDelay = 800;

    function scrollToSection(targetId, offset) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const targetPosition = targetElement.offsetTop - offset;
            window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
    }

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            scrollToSection(targetId, navHeight);
        });
    });

    window.addEventListener("load", () => {
        const urlHash = window.location.hash.substring(1);
        if (urlHash) {
            setTimeout(() => {
                scrollToSection(urlHash, navHeight + extraOffset);

                setTimeout(() => {
                    scrollToSection(urlHash, navHeight);
                }, adjustDelay); 
            }, 300); 
        }
    });
});



/*function updateHeroText() {
    let p = document.getElementById("hero-text");

    if (window.innerWidth < 550) {
        p.innerHTML = "Full-Stack Developer<br>& IT Specialist";
    } else {
        p.innerHTML = "Full-Stack Developer & IT Specialist";
    }
}

window.addEventListener("resize", updateHeroText);
window.addEventListener("load", updateHeroText);*/




