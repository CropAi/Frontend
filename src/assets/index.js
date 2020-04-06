const landingContainer = document.getElementById("landing_container");
const inputContainer = document.getElementById("input_container");
const resultContainer = document.getElementById("result_container");



const show_landing_container = () => {
    landingContainer.classList.remove("hidden");
    inputContainer.classList.add("hidden");
    resultContainer.classList.add("hidden");

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


/* Getting the query from the url */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const SectionToBeDisplay = urlParams.get('q')
console.log(SectionToBeDisplay);



if (SectionToBeDisplay=='analyze')
{
    show_input_container();
}
else if (SectionToBeDisplay=='result')
{
    console.log('redirecting to home page')
    window.location = "index.html";
}
