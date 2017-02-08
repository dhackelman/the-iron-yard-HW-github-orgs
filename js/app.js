(function () {

  const githubOrgs = function (){

    const clickShowBtn = document.querySelector('.show-button');
    const formEntry = document.querySelector('form-entry');

    class GithubOrganization {
      constructor(orgdeets) {
          this.avatar_url = orgdeets.avatar_url;
          this.id = orgdeets.id;
          this.login = orgdeets.login;
          this.build();
      }

      build() {
        const source = $("#org-template").html();
        const template = Handlebars.compile(source);
        const context = {
            image: this.avatar_url,
            login: this.login,
        };
        const html = template(context);
        $('.orgs-list').append(html);
      }
    }

    function bindEvents() {
      let value = "";
      $('.username-form').on('submit', function() {
          event.preventDefault();
          clearOutListItems();
          value = event.target[0].value;
          getApiResults(value);
          this.reset();
          return value;
      })

      clickShowBtn.addEventListener('click', ()=> {
        clearOutListItems();
        getApiResults(value);
      })
    }

    function clearOutListItems() {
      $('.orgs-list li').remove();
    }

    function getApiResults(value){
      //`curl -H "Authorization:6b1865fdc60cd6a1bbb72cce404c805c65985201"
      // token: 6b1865fdc60cd6a1bbb72cce404c805c65985201
      const settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://api.github.com/users/" + value + "/orgs?access_token=6b1865fdc60cd6a1bbb72cce404c805c65985201",
          "method": "GET"
        };
      $.ajax(settings).then(function(response) {
          if (response.length !== 0) {
            for (let index=0; index < response.length; index++) {
            new GithubOrganization(response[index]);
            }
          } else $('.orgs-list').html('<li class="sorry">Sorry! That user has no publicly viewable organizations.</li>');
      });
    }

    function init() {
      bindEvents();
    }

    return {
      init: init
    }
  }

  const githubOrgsApp = githubOrgs();

  githubOrgsApp.init();

})();
