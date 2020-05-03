const landingContainer = document.getElementById("landing_container");
const inputContainer = document.getElementById("input_container");
const resultContainer = document.getElementById("result_container");
const bottomContainer = document.getElementById("bottom-data");

// For loading spinner
const formInput = document.getElementById("form-input");
const submitButton = document.getElementById("submit-btn");
const loadingBtn = document.getElementById("loading-btn");
const countdown = document.getElementById("countdown");

const showLoadingSpinner = () => {
    formInput.classList.add('hidden');
    submitButton.classList.add('hidden');
    loadingBtn.classList.remove('hidden');
    // Adding a count down timer for 30 sec
    countdown.innerHTML ='30 seconds';
    var timeleft = 30;
   
    (function timer(){
        if (--timeleft < 0) return;
        setTimeout(function(){
            countdown.innerHTML = timeleft + ' seconds';
            timer();
        }, 1000);
    })();
}



const hideLoadingSpinner = () => {
    formInput.classList.remove('hidden');
    submitButton.classList.remove('hidden');
    loadingBtn.classList.add('hidden');
}

const show_landing_container = () => {
    landingContainer.classList.remove("hidden");
    inputContainer.classList.add("hidden");
    resultContainer.classList.add("hidden");
    bottomContainer.classList.remove("hidden");
}

const show_input_container = () => {
    landingContainer.classList.add("hidden");
    inputContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    bottomContainer.classList.remove("hidden");
}

const show_result_container = () => {
    landingContainer.classList.add("hidden");
    inputContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    bottomContainer.classList.add("hidden");
    document.getElementById("title").innerHTML = "Crop AI | Analysis Report";
}

// toggle About
const showAbout = () => {
    var about_dom = document.getElementById("abt-data-cont")
    about_dom.classList.toggle('fade_effect');
    document.getElementById("title").innerHTML = "Crop AI | Home"; 
}

// Function to display the result of analysis
const update_result = (report) => {
    // clearing previous results, if any
    var tags = ["#symptoms", "#treatment", "#products"];

    for (var i = 0; i < tags.length; i++) {
        const del_list = document.querySelector(tags[i]);
        del_list.innerHTML = '';
    }  

    // Adding current result
    const show_disease = document.querySelector("#disease");
    show_disease.textContent = report.category;
    const show_symptoms = document.querySelector("#symptoms");
    const symptoms = Object.values(report.Symptoms);
    symptoms.forEach((item) => {
        const list = document.createElement("li");
        list.textContent = item;
        document.querySelector("#symptoms").appendChild(list);
    });

    const treatment = Object.values(report.Treatment);
    treatment.forEach((item) => {
        const list = document.createElement("li");
        list.textContent = item;
        document.querySelector("#treatment").appendChild(list);
    });

    const product = Object.values(report.Recommended_Product);
    product.forEach((item) => {
        const med = item.split(":")[0].trim();
        const url = `${item.split(":")[1].trim()}:${item.split(":")[2].trim()}`;
        const list = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.setAttribute("href", url);
        anchor.setAttribute('target', '_blank');
        anchor.textContent = med;
        document
            .querySelector("#products")
            .appendChild(list)
            .appendChild(anchor);
    });
};

let visitingFromAnalyse = false;

// Display form to submit image of crop for analysis
const analyze_click = () => {
    visitingFromAnalyse = true;
    const DUMMY_URL = "./src/img/dummy-image.svg";
    const uploadButtonSpan = document.getElementById("uploadButtonText");
    window.history.pushState('Analyze Page', 'Crop AI', '?q=analyze');
    document.getElementById("leaf_input").value = "";
    document.getElementById("showImage").src = DUMMY_URL;
    uploadButtonSpan.innerHTML = "Upload a file";
    document.getElementById("label-text").innerHTML = "";
    document.getElementById("file-select-content").style.paddingTop = "";
    document.getElementById("title").innerHTML = "Crop AI | Analyze Crop";
	document.getElementById('label-text').innerText= '';
	document.getElementById('img-lab').style.display = "none";
	show_input_container();
}

// function to insert input image on form and result section
const showImage = event => {
    const DUMMY_URL = "./src/img/dummy-image.svg";
    const imageForm = document.getElementById("showImage");
    const imageResult = document.getElementById("leaf_image");
    const uploadButtonSpan = document.getElementById("uploadButtonText");
    const imageError = document.getElementById("image-error");
	const imageFile = event.target.files[0];
	const label = document.getElementById('label-text');
	const imgLab = document.getElementById('img-lab');
	const tooltipLabel = document.getElementById('tooltip-text');

    if (typeof imageFile == "undefined") {
        imageForm.src = DUMMY_URL;
        const file_select_content = document.getElementById('file-select-content');
		label.innerText= '';
		imgLab.style.display = "none";
		file_select_content.style.paddingTop="0%";
        alert('Image Not Uploaded');
        return false;
    }

	if(!(/\.(gif|jpe?g|tiff|jfif|png|webp|bmp)$/i).test(imageFile.name)) {	
        // Show error and reset image.
        validateAndDisplay(true);
        imageForm.src = DUMMY_URL;
		event.target.value = "";
		label.innerText = "";
		imgLab.style.display = "none";
		tooltipLabel.innerText = "";
		return false;
    }
    
    imageForm.src = URL.createObjectURL(imageFile);
    imageResult.src = URL.createObjectURL(imageFile);
    uploadButtonSpan.innerHTML = "Change Image";
    imageError.style.display = "none";
	label.innerText = imageFile.name;
	tooltipLabel.innerText = imageFile.name;
	imgLab.style.display = "block";
}

// Getting the query from the url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let SectionToBeDisplay = urlParams.get('q')

SectionToBeDisplay = SectionToBeDisplay || 'landing';

if (SectionToBeDisplay == 'analyze') {
    window.history.pushState("Analyze Page", "Crop AI", '?q=analyze');
    show_input_container();
}
else if (SectionToBeDisplay == 'result') {
    if (!visitingFromAnalyse) {
        window.history.pushState("Result Page", "Crop AI", '?q=analyze');
        show_input_container();
    }
    else {
    window.history.pushState("Result Page", "Crop AI", '?q=result');
    show_result_container();
    }   
}
else {
    // window.history.pushState("Landing Page", "Crop AI", 'index.html');
    show_landing_container();
}

window.addEventListener('popstate', () => {
    window.location.reload();
});

 // Warning message if input form is not added
function validateAndDisplay(fileNotImage = false) {
    var imageError = document.getElementById("image-error");
    if(fileNotImage)
    {
        imageError.textContent = "* File not an Image";
        imageError.style.display = "block";
        return false;
	}
    event.preventDefault();
    var x = document.getElementById("leaf_input").value;
    imageError.textContent = "* Upload an Image";

    if (x == "") {
        imageError.style.display = "block";
        return false;
    }
    showLoadingSpinner();

    // making an AJAX call to get result back!
    let formData = new FormData();
    const imageFile = $("#leaf_input")[0];
    formData.append('file', imageFile.files[0]);
    $.ajax({
        type: 'POST',
        url: 'https://crop-leaf.herokuapp.com/file_upload',
        data: formData,
        cache: false,
        mimeType: "multipart/form-data",
        contentType: false,
        processData: false,
        success: function (analysis_report_json) {
            hideLoadingSpinner();
            analysis_report_json = JSON.parse(analysis_report_json);
            //on successful response
            console.log("Successful reception of data!!");
            window.history.pushState("Result Page", "Crop AI", '?q=result');
            update_result(analysis_report_json);
            show_result_container();
        },
        error: function (err) {
            hideLoadingSpinner();
            alert("Something went wrong, Please try again after some time");
            console.error("Error getting data",err);
        }
    });
}
