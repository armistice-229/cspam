const slides = document.querySelectorAll('#hero-slider .slide');
let currentSlide = 0;

setInterval(() => {
    slides[currentSlide].classList.remove('opacity-100');
    slides[currentSlide].classList.add('opacity-0');

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.remove('opacity-0');
    slides[currentSlide].classList.add('opacity-100');
}, 5000);


//spiner
const btn = document.getElementById('btn-rechercher');
const spinner = document.getElementById('spinner');
const text = document.getElementById('text-rechercher');

btn.addEventListener('click', async () => {
// Affiche le spinner, cache le texte
spinner.classList.remove('hidden');
text.classList.add('hidden');
btn.disabled = true;

try {
    // Simule un appel backend (remplace par ton fetch réel)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // ... ici tu peux traiter la réponse
} catch (error) {
    console.error("Erreur :", error);
} finally {
    // Restaure le bouton
    spinner.classList.add('hidden');
    text.classList.remove('hidden');
    btn.disabled = false;
}
});


document.getElementById("btn-rechercher").addEventListener("click", async () => {
    const nom = document.getElementById("nom").value.trim();
    const classe = document.getElementById("classe").value.trim();
  
    if (!nom || !classe) {
      alert("Veuillez remplir le nom et la classe.");
      return;
    }
  
    // Ici, tu peux soit demander aussi les prénoms séparés, soit tout chercher dans un champ
    const [nomOnly, ...prenomsArray] = nom.split(" ");
    const prenoms = prenomsArray.join(" ");
  
    try {
      const response = await fetch(`https://cspambackend.onrender.com/api/eleves/rechercher?nom=${encodeURIComponent(nomOnly)}&prenoms=${encodeURIComponent(prenoms)}&classe=${classe}`);
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.error || "Erreur lors de la recherche.");
        return;
      }
  
      // Mise à jour du DOM
      document.getElementById("student-info").classList.remove("hidden");
      document.getElementById("student-name").innerText = data.nomComplet;
      document.getElementById("student-class").innerText = data.classe;
      document.querySelector("#student-info .space-y-3").innerHTML = `
        <div class="flex justify-between">
          <span>Frais de scolarité</span>
          <span class="font-medium">${data.montantTotal.toLocaleString()} FCFA</span>
        </div>
        <div class="flex justify-between">
          <span>Déjà payé</span>
          <span class="font-medium text-green-600">${data.montantPaye.toLocaleString()} FCFA</span>
        </div>
        <div class="flex justify-between border-t-2 border-gray-300 pt-2 mt-2">
          <span class="font-semibold">Reste à payer</span>
          <span class="font-bold text-red-600">${data.montantReste.toLocaleString()} FCFA</span>
        </div>
      `;
  
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la recherche.");
    }
  });
  

// FAQ accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        // Toggle answer
        answer.classList.toggle('hidden');
        
        // Rotate icon
        if(answer.classList.contains('hidden')) {
            icon.classList.remove('rotate-180');
        } else {
            icon.classList.add('rotate-180');
        }
    });
});
