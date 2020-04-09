const fetch = require("node-fetch");
 
let contributor_data = [];
let mentor_usernames = ['rajats98','vaibagga','tanishq9','gshanbhag525'];

// Extracting the information of Admin 
fetch('https://api.github.com/users/Sulekhiya')
    .then(
        function(response) {
            response.json().then(function(data) {
            let admin = {}
            admin.login =  data.login;
            admin.avatar_url = data.avatar_url;
            admin.html_url = data.html_url;
            admin.designation = "Admin";
            admin.repository =  [];
            contributor_data.push(admin);
        })
   })
 
// Extracting the information of mentors 
for(let i = 0; i < mentor_usernames.length; i++)
{
   
    fetch('https://api.github.com/users/'+mentor_usernames[i])
    .then(
        function(response) {
        response.json().then(function(data) {
            let mentor = {}
            mentor.login = data.login;
            mentor.avatar_url = data.avatar_url;
            mentor.html_url = data.html_url;
            mentor.designation = "Mentor";
            mentor.repository =  [];
            contributor_data.push(mentor);
        })
   })
}

// Extracting the information of participants of Frontend repository
fetch('https://api.github.com/repos/CropAi/Frontend/contributors')
.then(
  function(response) {
       response.json().then(function(data) {
        for(let i = 0; i < data.length; i++)
        {
            var res = contributor_data.find(user => user.login === data[i].login);

            if(res)
            {
               res.repository.push("Frontend");
            }
            else
            {
                let contributor = {};
                contributor.login = data[i].login;
                contributor.avatar_url = data[i].avatar_url;
                contributor.html_url = data[i].html_url;
                contributor.designation = "Participant";
                contributor.repository = ["Frontend"]; 
                contributor_data.push(contributor);
            }
        }
    })
})

// Extracting the information of participants of Backend repository    
fetch('https://api.github.com/repos/CropAi/Backend/contributors')
.then(
  function(response) {
       response.json().then(function(data) {
        for(let i = 0; i < data.length; i++)
        {
            var res = contributor_data.find(user => user.login === data[i].login);
            if(res)
            {
               res.repository.push("Backend");
            }
            else
            {
                let contributor = {};
                contributor.login = data[i].login;
                contributor.avatar_url = data[i].avatar_url;
                contributor.html_url = data[i].html_url;
                contributor.designation = "Participant";
                contributor.repository = ["Backend"]; 
                contributor_data.push(contributor);
            }
        }
    })
})

// Extracting the information of participants of Data-Modeling repository
 fetch('https://api.github.com/repos/CropAi/Data-Modeling/contributors')
 .then(
   function(response) {
        response.json().then(function(data) {
         for(let i = 0; i < data.length; i++)
         {
             var res = contributor_data.find(user => user.login === data[i].login);
             if(res)
             {
                res.repository.push("Data-Modeling");
             }
             else
             {
                 let contributor = {};
                 contributor.login = data[i].login;
                 contributor.avatar_url = data[i].avatar_url;
                 contributor.html_url = data[i].html_url;
                 contributor.designation = "Participant";
                 contributor.repository = ["Data-Modeling"]; 
                 contributor_data.push(contributor);
             }
         }
    })
})

 // Extracting the information of participants of Android-Application repository
 fetch('https://api.github.com/repos/CropAi/Android-Application/contributors')
 .then(
   function(response) {
        response.json().then(function(data) {
         for(let i = 0; i < data.length; i++)
         {
             var res = contributor_data.find(user => user.login === data[i].login);
             if(res)
             {
                res.repository.push("Android-Application");
             }
             else
             {
                 let contributor = {};
                 contributor.login = data[i].login;
                 contributor.avatar_url = data[i].avatar_url;
                 contributor.html_url = data[i].html_url;
                 contributor.designation = "Participant";
                 contributor.repository = ["Android-Application"]; 
                 contributor_data.push(contributor);
             }
         }
    })
})
