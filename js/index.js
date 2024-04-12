document.addEventListener("DOMContentLoaded", function () {
    let formGet = document.querySelector('form')
    let userList = document.getElementById('user-list')
    let repoList = document.getElementById('repos-list')
    formGet.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchQuery = document.getElementById('search').value;


        fetch(`https://api.github.com/search/users?q=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },


        })
            .then(response => response.json())
            .then(data => {
                userList.innerHTML = '';
                data.items.forEach(user => {
                    if (user.login.toLowerCase().includes(searchQuery.toLowerCase())) {

                        const li = document.createElement('li')
                        const alink = document.createElement('a');
                        alink.textContent = user.login;
                        li.appendChild(alink);
                        userList.appendChild(li);
                        console.log(li);
                        li.addEventListener('click', function (e) {
                            fetch(`https://api.github.com/users/${user.login}/repos`, {

                                method: 'GET',
                                headers: {
                                    'Accept': 'application/vnd.github.v3+json',
                                    'Content-Type': 'application/json'
                                },
                            })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    repoList.innerHTML = '';
                                    data.forEach(repo => {
                                        const li = document.createElement('li')
                                        li.textContent = repo.full_name;
                                        repoList.appendChild(li);
                                        console.log(li);
                                    })
                                })
                        })
                    }
                })
            })
    })
})