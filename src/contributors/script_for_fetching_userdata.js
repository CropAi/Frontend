let contributor_information = async contributor_data_default => {
  let contributor_data = {};
  const mentor_usernames = ['rajats98','vaibagga','tanishq9','gshanbhag525','Sulekhiya'];
  const repos = ['Frontend','Backend','Data-Modeling','Android-Application'];
  const requests = repos.map(repo => fetch(`https://api.github.com/repos/CropAi/${repo}/contributors`));
  requests.push(fetch(`https://api.github.com/repos/CropAi/Frontend/contributors?page=2`));
  let responses;
  // Extracting the information of participants
  try{
    responses = await Promise.all(requests);
  }
  catch(e){
    return contributor_data_default;
  }
 
  for (var i = 0; i < responses.length; i++) {
    response = responses[i]
    const repo = response.url.split('/')[5];
   
    let users = await response.json();
 
    for (let j = 0; j < users.length; j++) {
      let user = users[j];
      let {login, avatar_url, html_url} = user;
       
      if(!contributor_data[login]){
        contributor_data[login] = {login, avatar_url, html_url };
        contributor_data[login].repository = [];
      }
      contributor_data[login].repository.push(repo);
 
      if(mentor_usernames.includes(login)){
        contributor_data[login].designation = login === "Sulekhiya" ? "admin" : "mentor";
      }
      else{
        contributor_data[login].designation = "participant";
      }
    }
  }
  contributor_data["Sulekhiya"] = {
    "login": "Sulekhiya",
    "avatar_url": "https://avatars0.githubusercontent.com/u/32355917",
    "html_url": "https://github.com/Sulekhiya",
    "repository": [],
    "designation": "mentor"  // to be updated to admin later
  }

  return contributor_data;
}
