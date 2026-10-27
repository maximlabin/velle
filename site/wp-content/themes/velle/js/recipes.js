const meal_time = document.querySelectorAll('[data-meal_time]');
const cooking_time = document.querySelectorAll('[data-cooking_time]');
const allFilter = document.querySelectorAll('.tabs .item.all-items');
const blog_mark = document.querySelectorAll('[data-blog_mark]');
const meal_tine_select = document.querySelector('#meal_tine_select');
const cooking_time_select = document.querySelector('#cooking_time_select');
const blog_type_select = document.querySelector('#blog_type_select');

if(blog_mark) {
    for (let i = 0; i < blog_mark.length; i++) {
        blog_mark[i].addEventListener('click', function (e) {
            if (document.querySelector('.tabs .active:not([data-blog_mark])')) {
                document.querySelector('.tabs .active:not([data-blog_mark])').classList.remove('active');
            }
            let mealParam = 'blog-mark=' + this.dataset.blog_mark;
            history.pushState({page: 1}, "title 1", '/blog/?' + mealParam);
            //document.querySelectorAll('.all-items').classList.remove('active');
            this.classList.add('active');
            document.location.reload();
            // recipesFilter();
        })
    }
}
// фильтр по времени приема пищи
if (meal_time) {
    for (let i = 0; i < meal_time.length; i++) {
        meal_time[i].addEventListener('click', function (e) {
            if (document.querySelector('.tabs .active:not([data-cooking_time])')) {
                document.querySelector('.tabs .active:not([data-cooking_time])').classList.remove('active');
            }
            let mealParam = 'meal=' + this.dataset.meal_time;
            let timeParam = findGetParameter('time') ? '&time=' + findGetParameter('time') : ''
            history.pushState({page: 1}, "title 1", '?' + mealParam + timeParam);
            //document.querySelectorAll('.all-items').classList.remove('active');
            this.classList.add('active');
            document.location.reload();
            // recipesFilter();
        })
    }
}
// фильтр по времени приготовления
if (cooking_time) {
    for (let i = 0; i < cooking_time.length; i++) {
        cooking_time[i].addEventListener('click', function (e) {
            if (document.querySelector('.tabs .active:not([data-meal_time])')) {
                document.querySelector('.tabs .active:not([data-meal_time])').classList.remove('active');
            }
            //document.querySelectorAll('.all-items').classList.remove('active');
            let mealParam = findGetParameter('meal') ? '&meal=' + findGetParameter('meal') : '';
            let timeParam = 'time=' + this.dataset.cooking_time;
            history.pushState({page: 1}, "title 1", '?' + timeParam + mealParam);
            this.classList.add('active');
            document.location.reload();
            // recipesFilter();
        })
    }
}

if(blog_type_select) {
    blog_type_select.onchange = function (e) {
        let blogParam = '';
        if (this.options[this.selectedIndex].value != "all-types") {
            blogParam = 'blog-mark=' + this.options[this.selectedIndex].value;
        } else {
            blogParam = '';
        }
        history.pushState({page: 1}, "title 1", '?' + blogParam);
        document.location.reload();
    }
}

if(meal_tine_select) {
    meal_tine_select.onchange = function (e) {
        // console.log(this.options[this.selectedIndex].value);
        let mealParam ='';
        if(this.options[this.selectedIndex].value != "all-types") {
            mealParam = 'meal=' + this.options[this.selectedIndex].value;
        } else {
            mealParam = '';
        }
        let timeParam = findGetParameter('time') ? '&time=' + findGetParameter('time') : ''
        history.pushState({page: 1}, "title 1", '?' + mealParam + timeParam);
        document.location.reload();
    }
}

if(cooking_time_select) {
    cooking_time_select.onchange = function (e) {
        let timeParam = '';
        if(this.options[this.selectedIndex].value != "all-times") {
            timeParam = 'time=' + this.options[this.selectedIndex].value;
        } else {
            timeParam = '';
        }
        let mealParam = findGetParameter('meal') ? '&meal=' + findGetParameter('meal') : '';

        history.pushState({page: 1}, "title 1", '?' + timeParam + mealParam);
        document.location.reload();
    }
}

if (allFilter) {
    for (let i = 0; i < allFilter.length; i++) {
        allFilter[i].addEventListener('click', function (e) {
            let activeFilters = document.querySelectorAll('.tabs .active');
            if (activeFilters) {
                for (let j = 0; j < activeFilters.length; j++) {
                    activeFilters[j].classList.remove('active');
                }
            }
            history.pushState({page: 1}, "title 1", "?");
            //document.querySelectorAll('.all-items').classList.remove('active');
            this.classList.add('active');
            document.location.reload();
            // recipesFilter();
        })
    }
}

// Пересмотреть функцию
function recipesFilter() {
    let meal_timeSelect = document.querySelector('.tabs .active[data-meal_time]');
    let cooking_timeSelect = document.querySelector('.tabs .active[data-cooking_time]');
    let data_ = {
        'action': 'filterRecipes',
        'meal_time': meal_timeSelect ? meal_timeSelect.dataset.meal_time : 0,
        'cooking_time': cooking_timeSelect ? cooking_timeSelect.dataset.cooking_time : 0,
        'page': document.querySelector('.content[data-page_num]') ? document.querySelector('.content[data-page_num]').dataset.page_num : 1,
    }
    const recipesContainer = document.querySelector('.allRecipesPage .content');
    const paginationContainer = document.querySelector('.d-flex.align-items-center.justify-content-center.mb-105');
    $.ajax({
        url: '/wp-admin/admin-ajax.php',
        data: data_,
        type: 'POST',
        success: function (data) {
            if (!!data) {
                let filter = JSON.parse(data);
                recipesContainer.innerHTML = filter.cards;
                if (filter.pagination) {
                    paginationContainer.innerHTML = filter.pagination;
                }
            } else { // Если постов больше нет
                // target.remove();
            }
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadMoreBlogs(pageNum, pageCount) {
    let data_ = {
        'action': 'morePosts',
        'page': (parseInt(pageNum, 10)+1),
    }
    let postsContainer = document.querySelector('.blog .content');
    if(!postsContainer) {
        postsContainer = document.querySelector('.all-recipes .content');
    }
    $.ajax({
        url: '/wp-admin/admin-ajax.php',
        data: data_,
        type: 'POST',
        success: function (data) {
            if (!!data) {
                let nextNum = (parseInt(pageNum, 10)+1);
                history.pushState({page: pageNum}, "", "/blogs/page/"+nextNum+"/");
                document.querySelector('.load-more').dataset.page = nextNum;
                const paginationContainer = document.querySelector('.d-flex .swiper-pagination .numbers-wrapper');
                if(paginationContainer) {
                    paginationContainer.innerHTML = "";
                }
                for (let i = parseInt(pageNum, 10); i <= parseInt(pageCount, 10); i++) {
                    if(i === nextNum+2) {
                        break;
                    }
                    let paginateLink = document.createElement('a');
                    if(i === nextNum) {
                        paginateLink.setAttribute('class', 'pagination-number pagination-number__active');
                    } else {
                        paginateLink.setAttribute('class', 'pagination-number');
                        paginateLink.setAttribute('href', '/blogs/page/'+i+'');
                    }

                    paginateLink.innerHTML = i;
                    paginationContainer.appendChild(paginateLink);
                }
                // console.log(data);
                if(nextNum >= pageCount) {
                    document.querySelector('.load-more').style.display = 'none';
                }
                postsContainer.innerHTML += data;
            } else { // Если постов больше нет
                // target.remove();
            }
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadMoreBlog(pageNum, pageCount) {
    let data_ = {
        'action': 'morePosts',
        'page': (parseInt(pageNum, 10)+1),
        'post_type': 'blog',
    }
    let postsContainer = document.querySelector('.blog .content');
    if(!postsContainer) {
        postsContainer = document.querySelector('.all-recipes .content');
    }
    $.ajax({
        url: '/wp-admin/admin-ajax.php',
        data: data_,
        type: 'POST',
        success: function (data) {
            if (!!data) {
                let nextNum = (parseInt(pageNum, 10)+1);
                history.pushState({page: pageNum}, "", "/blog/page/"+nextNum+"/");
                document.querySelector('.load-more').dataset.page = nextNum;
                const paginationContainer = document.querySelector('.d-flex .swiper-pagination .numbers-wrapper');
                paginationContainer.innerHTML = "";

                for (let i = parseInt(pageNum, 10); i <= parseInt(pageCount, 10); i++) {
                    if(i === nextNum+2) {
                        break;
                    }
                    let paginateLink = document.createElement('a');
                    if(i === nextNum) {
                        paginateLink.setAttribute('class', 'pagination-number pagination-number__active');
                    } else {
                        paginateLink.setAttribute('class', 'pagination-number');
                        paginateLink.setAttribute('href', '/blog/page/'+i+'');
                    }

                    paginateLink.innerHTML = i;
                    paginationContainer.appendChild(paginateLink);
                }
                // console.log(data);
                if(nextNum >= pageCount) {
                    document.querySelector('.load-more').style.display = 'none';
                }
                postsContainer.innerHTML += data;
            } else { // Если постов больше нет
                // target.remove();
            }
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

const loadMoreBtn = document.querySelector('.load-more');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function (e) {
        if(this.classList.contains('blog_new')) {
            loadMoreBlog(this.dataset.page, this.dataset.pagcoutn);
        } else {
            loadMoreBlogs(this.dataset.page, this.dataset.pagcoutn);
        }
    })
}
