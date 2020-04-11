const landingContainer = document.getElementById("landing_container");
const inputContainer = document.getElementById("input_container");
const resultContainer = document.getElementById("result_container");
const bottomContainer = document.getElementById("bottom-data");


const show_landing_container = () => {
    landingContainer.classList.remove("hidden");
    inputContainer.classList.add("hidden");
    resultContainer.classList.add("hidden");
    bottomContainer.style.margin = "40% 1% 0% 27%";
}

const show_input_container = () => {
    landingContainer.classList.add("hidden");
    inputContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    bottomContainer.style.margin = "40% 1% 0% 27%";
}

const show_result_container = () => {
    landingContainer.classList.add("hidden");
    inputContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    bottomContainer.style.margin = "5% 2% 0% 27%";
}


// toggle About
const showAbout = () => {
    document.getElementById("about_content").classList.toggle("hidden");
    document.getElementById("about_content").classList.add("fade");

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
    //clearing previous results, if any
    var tags = ["#symptoms", "#treatment", "#products"];

    for (var i = 0; i < tags.length; i++) {
        const del_list = document.querySelector(tags[i]);
        del_list.innerHTML = '';

    }  //adding current result
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
    // form submission
    const form = document.querySelector(".upload-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // on successful response
        window.history.pushState("Result Page", "Crop AI", '?q=result');
        update_result(analysis_report_json);
        show_result_container();

    });


    const analyze_click = () => {
        window.history.pushState('Analyze Page', 'Crop AI', '?q=analyze');
        document.getElementById("leaf_input").value = "";
        document.getElementById("showImage").src = "";
        show_input_container();
    }

    // function to insert input image on form and result section
    const showImage = event => {
        const imageForm = document.getElementById("showImage");
        const imageResult = document.getElementById("leaf_image");
        imageForm.src = URL.createObjectURL(event.target.files[0]);
        imageResult.src = URL.createObjectURL(event.target.files[0]);
    }

    /* Getting the query from the url */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let SectionToBeDisplay = urlParams.get('q')

    SectionToBeDisplay = SectionToBeDisplay || 'landing';
    // console.log(SectionToBeDisplay);


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


/* Warning message if input form is not added*/
function empty() {
    var x = document.getElementById("leaf_input").value;
    if (x == "") {
        alert("Image must be uploaded");
        return false;
    }
}
