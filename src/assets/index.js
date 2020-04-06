const landingContainer = document.getElementById("landing_container");
const inputContainer = document.getElementById("input_container");
const resultContainer = document.getElementById("result_container");



const show_landing_container = () => {
    landingContainer.classList.remove("hidden");
    inputContainer.classList.add("hidden");
    resultContainer.classList.add("hidden");
} 

const analyze_click = () => {
    window.history.pushState('Analyze', 'Crop Analysis', '?q=analyze');
    show_input_container();
}

const show_input_container = () => {
    landingContainer.classList.add("hidden");
    inputContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
}

const show_result_container = () => {
    landingContainer.classList.add("hidden");
    inputContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
}


$('#about_btn').click(function() {
    $('#about_content').toggle('slow');
});


