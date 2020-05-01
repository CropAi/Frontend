const Participants = document.getElementById("Participants");
const Participants_button = document.getElementById("Participants_button");
const Mentor = document.getElementById("Mentors");
const Mentors_button = document.getElementById("Mentors_button");

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
    const gssocProfileLink = `https://www.gssoc.tech/profile.html?id=${login}`;

    const cardComponent =
     `<div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card">
            <img src=${avatar_url} class="card-img-top" alt=${login}>
                <div class="card-body" style="background-color:${user_palette[Math.floor(Math.random()*user_palette.length)].background};">
                    <h5 class="card-title" style="color:${user_palette[Math.floor(Math.random()*user_palette.length)].color};">${login}</h5>
                        ${repositoryTags(repository).join(' ')}
                    
                    <div class="links">
                      <a href=${gssocProfileLink} target="__blank">
                        <img src="../img/gssoc-logo.png" alt="Participant GSSoC Profile" class="gssoc-profile">
                      </a>
                      <a href=${html_url} target="__blank">
                        <i class="fa fa-github" aria-hidden="true" style="font-size: 2rem;"></i>
                      </a>
                    </div>
                </div>
        </div>
    </div>`;

    // designation can be 'mentor' or 'participant'
    document.getElementById(`${designation}`).innerHTML+=cardComponent;

}

//getting contributors details
contributor_information(contributor_data_default)
    .then(contributors => {
        const loader = document.getElementById("loader-spinner");
        loader.remove();
        for (const contributor in contributors){
            create_user_card(contributors[contributor]);
        }
    });
