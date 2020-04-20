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


// color Palette for the 
const bgColors = {
    'Frontend': 'green',
    'Android-Application': 'blue',
    'Backend': 'brown',
    'Data-Modeling': 'orange'
}


// function to generate repository tags
const repositoryTags = repository => {

    const tags = repository.map(repo =>
        `<span class="badge badge-space" style="background-color:${bgColors[repo]};">${repo}</span>`)
    return tags;

}


// function to create user-card : paramter expected- user object
const create_user_card = user => {

    // destructure the user object into keys pairs
    const { login, avatar_url, html_url, repository, designation } = user;

    const cardComponent = `<div class="card" style="width: 18rem;">
                  <img src=${avatar_url} class="card-img-top" alt=${login}>
                    <div class="card-body">
                        <h5 class="card-title">${login}</h5>
                        ${repositoryTags(repository).join(' ')}
                        <a href = ${html_url} target="__blank">
                            <i class="fa fa-github" aria-hidden="true" style="font-size: 2rem;" ></i>
                        </a>
                    </div>
                </div>`;
    return cardComponent;

}

