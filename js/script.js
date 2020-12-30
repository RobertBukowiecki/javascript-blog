{
  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  }

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optAuthorListSelector = '.authors',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-';


  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }


    /* [DONE] add class 'active' to the clicked link */

    console.log(clickedElement);

    const acivetedLink = clickedElement.classList.add('active');


    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.post');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    };

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);


    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */

    const acivetedArticle = targetArticle.classList.add('active');
  };

  function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    // console.log(optArticleSelector, customSelector);

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';
    for (let article of articles) {

      /* get the article id */

      const articleId = article.getAttribute('id');

      // console.log(articles);

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      // console.log(articleTitle);

      /* get the title from the title element */

      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);


      // console.log(linkHTML);

      /* create HTML of the link */

      html = html + linkHTML;

      /* insert link into titleList */

      // titleList.insertAdjacentHTML('afterbegin', article)
      // console.log(html)
    }
    titleList.innerHTML = html;

    /* insert links into titileList*/

    const links = document.querySelectorAll('.titles a');
    // console.log(links)
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  };
  generateTitleLinks();

  function calculateTagsParams(tags) {
    const params = { max: 0, min: 999999 };
    for (let tag in tags) {
      // console.log(tag + ' is used ' + tags[tag] + ' times');
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  }

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    const tagSize = (optCloudClassPrefix + classNumber);
    return tagSize
  }

  function generateTags() {

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */

    const articles = document.querySelectorAll('.post');
    // console.log(articles)

    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */

      const tagsList = article.querySelector(optArticleTagsSelector);
      // console.log(tagsList)

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      // console.log(articleTags);

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');
      // console.log(articleTagsArray);

      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {
        // console.log(tag)

        /* generate HTML of the link */
        const linkHTMLData = { id: tag, title: tag };
        const linkHTML = templates.articleLink(linkHTMLData);
        // console.log(linkHTML);

        /* add generated code to html variable */

        html = linkHTML + html;
        // console.log(html);
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add generated code to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */

        /* insert HTML of all the links into the tags wrapper */

        tagsList.innerHTML = html;
        // console.log(html)

        const tagsParams = calculateTagsParams(allTags);
        // console.log('tagsParams:', tagsParams);

        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector('.tags');

        /* [NEW] create variable for all links HTML code */

        let allTagsHTML = '';

        /* [NEW] START LOOP: for each tag in allTags: */

        for (let tag in allTags) {

          /* [NEW] generate code of a link and add it to allTagsHTML */

          allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
        }
        /* [NEW] END LOOP: for each tag in allTags: */

        /*[NEW] add HTML from allTagsHTML to tagList */
        tagList.innerHTML = allTagsHTML
      }
    }
    // console.log(allTags);
  };

  generateTags();



  const tagClickHandler = function (event) {
    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;
    console.log('Tag was clicked!');
    console.log(event);
    console.log(clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */

    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(tagLinks);

    /* START LOOP: for each active tag link */
    for (let tagLink of tagLinks) {
      /* remove class active */
      tagLink.classList.remove(".active")
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinksActive = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let tagLinkActive of tagLinksActive) {

      /* add class active */
      tagLinkActive.classList.add('.active');
      // console.log(tagLink);

      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    let links = document.querySelectorAll('.post-tags a, .tags a');
    /* START LOOP: for each link */
    for (let link of links)
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }

  addClickListenersToTags();







  function generateAuthors() {
    let allAuthors = {};

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {


      const authorLink = article.querySelector(optArticleAuthorSelector);
      // console.log(article);
      authorLink.innerHTML = '';

      let html = '';

      const articleAuthors = article.getAttribute('data-author');
      // console.log(articleAuthors);
      const linkHTMLData = {id: articleAuthors, title: articleAuthors};
      const linkHTML = templates.articleAuthor(linkHTMLData);
      // const linkHTML = '<a href="#author-' + articleAuthors + '">by' + '&nbsp;' + articleAuthors + '</a>';

      html = linkHTML + html;
      let allAuthorsHTML = '';

      if (!allAuthors[articleAuthors]) {
        /* [NEW] add generated code to allAuthors object */
        allAuthors[articleAuthors] = 1;
      } else {
        allAuthors[articleAuthors]++;
      }
      // console.log(html);

      for (let articleAuthors in allAuthors) {
        allAuthorsHTML += '<li><a href="#author-' + articleAuthors + '" class="author">' + articleAuthors + ' (' + allAuthors[articleAuthors] + ')</a></li>';

      }
      const authorsList = document.querySelector('.authors')
      // console.log(allAuthors);
      // console.log(allAuthorsHTML);

      authorsList.innerHTML = allAuthorsHTML;


      authorLink.innerHTML = html;
    }
  };

  generateAuthors();


  const authorClickHandler = function (event) {

    event.preventDefault();
    const clickedElement = this;
    console.log('Author was clicked!');

    const href = clickedElement.getAttribute('href');
    console.log(href);

    console.log(clickedElement);

    const author = href.replace('#author-', '');
    console.log(author);
    const activetedAuthor = clickedElement.classList.add('active');

    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    // console.log(authorLinks);
    for (let authorLink of authorLinks) {
      authorLink.classList.remove('active');
    };

    const authorLinksActive = document.querySelectorAll('a[href="' + href + '"]');

    for (let authorLinkActive of authorLinksActive) {

      authorLinkActive.classList.add('.active');



    }

    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
    /* find all links to tags */
    let links = document.querySelectorAll('.post-author a, .authors a');
    /* START LOOP: for each link */
    for (let link of links)
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }

  addClickListenersToAuthors();

}
