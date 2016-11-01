function Social() {
    this._title = document.querySelector('meta[property="og:title"]');
    this._description = document.querySelector('meta[property="og:description"]');
    this._image = document.querySelector('meta[property="og:image"]');

    this.settings = {
        title: this._title ? this._title.getAttribute('content') : '',
        description: this._description ? this._description.getAttribute('content') : '',
        url: location.href,
        image: this._image ? this._image.getAttribute('content') : ''
    };
}

Social.prototype.openModal = function (url) {
    window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
};

Social.prototype.fb = function () {
    var url = 'http://www.facebook.com/sharer.php?s=100';
    url += '&p[title]=' + encodeURIComponent(this.settings.title);
    url += '&p[summary]=' + encodeURIComponent(this.settings.description);
    url += '&p[url]=' + encodeURIComponent(this.settings.url);
    url += '&p[images][0]=' + encodeURIComponent(this.settings.image);

    this.openModal(url);
};

Social.prototype.ok = function () {
    var url = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
    url += '&st._surl=' + encodeURIComponent(this.settings.url);
    url += '&st.comments=' + encodeURIComponent(this.settings.description);

    this.openModal(url);
};

Social.prototype.vk = function () {
    var url = 'http://vkontakte.ru/share.php?';
    url += 'url=' + encodeURIComponent(this.settings.url);
    url += '&title=' + encodeURIComponent(this.settings.title);
    url += '&description=' + encodeURIComponent(this.settings.description);
    url += '&image=' + encodeURIComponent(this.settings.image);
    url += '&noparse=true';

    this.openModal(url);
};

Social.prototype.tw = function () {
    var url = "http://twitter.com/share?";
    url += "text=" + encodeURIComponent(this.settings.title + " " + this.settings.description);
    url += "&url=" + encodeURIComponent(this.settings.url);
    url += "&counturl=" + encodeURIComponent(this.settings.url);

    this.openModal(url);
};


document.addEventListener('DOMContentLoaded', function () {
    var share = new Social(),
        buttons = document.querySelectorAll('[data-share-network]');
    
    if (!buttons.length) {
        return false;
    }

    for (var index = 0; index < buttons.length; index++) {
        
        if (typeof share[ buttons[index].dataset.shareNetwork ] === 'function') {
            buttons[index].addEventListener('click', function (e) {
                e = e || window.event;
                
                e.preventDefault();
                
                share[ this.dataset.shareNetwork ]();
            });
        }
    }
});
