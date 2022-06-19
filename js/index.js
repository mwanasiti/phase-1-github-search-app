

document.addEventListener('DOMContentLoaded', ()=>{
    const form=document.querySelector('form')
    form.addEventListener('submit',(event)=>{
        event.preventDefault()
        let gitUser=form.search.value
        fetchUsers(gitUser)
    })
})

function fetchUsers(gitUser){
    fetch(`https://api.github.com/search/users?q=${gitUser}`)
    .then(response=>response.json()).then(data=>showUserName(data.items))

}

function fetchRepos(url){
    fetch(url).then(resp=>resp.json()).then(data=>showRepos(data))
}

function showUserName(names){
    names.forEach(name => {
        //console.log(name)

        let li=document.createElement("li")
        let anchor=document.createElement('a')

        li.innerHTML=name.login
        document.getElementById('user-list').appendChild(li)
        li.addEventListener('click', ()=>{
            fetchRepos(name.repos_url)
        })
    });
}

function showRepos(repos){
    let data=''
    repos.forEach(repo=>{
        data+=`
        <li>${repo.name}</li>
        `
    });
    const repoList=document.getElementById('repos-list')
    repoList.innerHTML=data
}
