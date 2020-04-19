const Participants = document.getElementById("Participants");
const Participants_button = document.getElementById("Participants_button");
const Mentor = document.getElementById("Mentors");
const Mentors_button = document.getElementById("Mentors_button");

contributor_information(contributor_data_default).then(res => {console.log(res)});

const show_participants_div = () => {
    Participants.classList.remove("hidden");
    Mentor.classList.add("hidden");
    Participants_button.classList.add("active");
    Mentors_button.classList.remove("active");
}

const show_mentor_div = () => {
    Mentor.classList.remove("hidden");
    Participants.classList.add("hidden");
    Participants_button.classList.remove("active");
    Mentors_button.classList.add("active");
}
