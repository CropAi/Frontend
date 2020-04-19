const landingContainer = document.getElementById("landing_container");
const inputContainer = document.getElementById("input_container");
const resultContainer = document.getElementById("result_container");
const bottomContainer = document.getElementById("bottom-data");

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
}


// toggle About
const showAbout = () => {
    var about_dom = document.getElementById("abt-data-cont")
    about_dom.classList.toggle('fade_effect');
}

// dummy data to be removed after Api integration
const analysis_report_json = {
    Disease: "Pepper Bell Healthy",
    Symptoms: {
        1: "Initial symptoms of infection are the formation of small, circular, water-soaked spots on leaves, stems, petioles and/or peduncles",
        2: "Infected Pepper Bell have Circular lesions on fruit which contain tan to orange to black concentric rings in the center.",
        3: "It can have lesions may also occur on leaves and stems and appear as irregularly shaped gray spots with dark margins",
        4: "Seeds did not germinate; seedlings collapsing and dying; dark stems which are shriveled near the soil line",
        5: " Water-soaked lesions on the stem and discolored roots.",
        6: "High numbers of lesions may form on leaves causing them to turn yellow and drop from the plant.",
    },
    Treatment: {
        1: "Plant only diseasefree, certified seed",
        2: "Always plant disease-free seeds and transplants.",
        3: "Seeds can be freed from infection by treating with hot water.",
        4: "Use disease free planting material; remove and destroy all crop debris after harvest, or plow material deeply under soil",
        5: "Magnesium deficiency can be prevented by applying dolomite lime to the soil, if an increase in soil pH is required, or through applications of a fertilizer containing magnesium.",
    },
    Recommended_Product: {
        1: "Chlorothalonil-720-SFT : https://www.amazon.com/Chlorothalonil-Generic-Daconil-weatherstik-quali-1060/dp/B004GTOKSO",
        2: " Tafgor-Dimethoate : https://www.amazon.in/Tata-TATA-Tafgor-Dimethoate-Insecticide/dp/B074CCXPKF",
        3: "Ethion Insecticide : https://www.indiamart.com/proddetail/ethion-insecticide-12777127212.html",
        4: "Vector Super : https://www.amazon.in/Vector-100ML-IMIDACLOPRID-Systemic-Insecticide/dp/B07D7YTYTB",
    },
};


const update_result = (report) => {
    // clearing previous results, if any
    var tags = ["#symptoms", "#treatment", "#products"];

    for (var i = 0; i < tags.length; i++) {
        const del_list = document.querySelector(tags[i]);
        del_list.innerHTML = '';

    }  // Adding current result
        const show_disease = document.querySelector("#disease");
        show_disease.textContent = report.Disease;

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

            anchor.textContent = med;
            document
                .querySelector("#products")
                .appendChild(list)
                .appendChild(anchor);
        });
};

function handle_name(img_name){
    if(name.length<12){
        return img_name.slice(0,11)+"....";
    }
    else{
        return img_name;
      }
}

const analyze_click = () => {
		const DUMMY_URL = "./img/dummy-image.svg";
		const uploadButtonSpan = document.getElementById("uploadButtonText");
        window.history.pushState('Analyze Page', 'Crop AI', '?q=analyze');
        document.getElementById("leaf_input").value = "";
		document.getElementById("showImage").src = DUMMY_URL;
		uploadButtonSpan.innerHTML = "Upload a file";
    document.getElementById("img-lab").innerHTML = "";
    document.getElementById("file-select-content").style.paddingTop = "";
        show_input_container();
    }

    // function to insert input image on form and result section
    const showImage = event => {
		const DUMMY_URL = "./img/dummy-image.svg";
        const imageForm = document.getElementById("showImage");
		const imageResult = document.getElementById("leaf_image");
		const uploadButtonSpan = document.getElementById("uploadButtonText");
		const imageError = document.getElementById("image-error");
        const imageFile = event.target.files[0];
        
        if (typeof imageFile == "undefined") {
            imageForm.src = DUMMY_URL;
            const label = document.getElementById('img-lab');
            const file_select_content = document.getElementById('file-select-content');
            label.innerText= '';
            file_select_content.style.paddingTop="0%";
            alert('Image Not Uploaded');
			return false;   
        }

		if(!(/\.(gif|jpe?g|tiff|jfif|png|webp|bmp)$/i).test(imageFile.name))
		{	// Show error and reset image.
			validateAndDisplay(true);
			imageForm.src = DUMMY_URL;
			event.target.value = "";
			return false;
		}
		imageForm.src = URL.createObjectURL(imageFile);
		imageResult.src = URL.createObjectURL(imageFile);
		uploadButtonSpan.innerHTML = "Change Image";
        imageError.style.display = "none";
        
    
    // Adding image name
    const filename=document.getElementById('leaf_input');
    const label = document.getElementById('img-lab');
    const file_select_content = document.getElementById('file-select-content');
    label.innerText= handle_name(filename.files.item(0).name);
    file_select_content.style.paddingTop="10%";
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
        window.history.pushState("Result Page", "Crop AI", '?q=result');
        show_result_container();
    }

    else {
        window.history.pushState("Landing Page", "Crop AI", 'index.html');
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
        success: function (data) {
            console.log("Successful reception of data!!");
            console.log(data);
        },
        error: function (data) {
            console.log("error");
            console.log(data);
        }
    });


    // on successful response
    window.history.pushState("Result Page", "Crop AI", '?q=result');
    update_result(analysis_report_json);
    show_result_container();
}
