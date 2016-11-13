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

    this.url = '';
}

Social.prototype.openModal = function () {
    window.open(this.url, '', 'toolbar=0,status=0,width=626,height=436');
};

Social.prototype.fb = function () {
    this.url = 'http://www.facebook.com/sharer.php?s=100';
    this.url += '&p[title]=' + encodeURIComponent(this.settings.title);
    this.url += '&p[summary]=' + encodeURIComponent(this.settings.description);
    this.url += '&p[url]=' + encodeURIComponent(this.settings.url);
    this.url += '&p[images][0]=' + encodeURIComponent(this.settings.image);

    this.openModal();
};

Social.prototype.ok = function () {
    this.url = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
    this.url += '&st._surl=' + encodeURIComponent(this.settings.url);
    this.url += '&st.comments=' + encodeURIComponent(this.settings.description);

    this.openModal();
};

Social.prototype.vk = function () {
    this.url = 'http://vkontakte.ru/share.php?';
    this.url += 'url=' + encodeURIComponent(this.settings.url);
    this.url += '&title=' + encodeURIComponent(this.settings.title);
    this.url += '&description=' + encodeURIComponent(this.settings.description);
    this.url += '&image=' + encodeURIComponent(this.settings.image);
    this.url += '&noparse=true';

    this.openModal();
};

Social.prototype.tw = function () {
    this.url = 'http://twitter.com/share?';
    this.url += 'text=' + encodeURIComponent(this.settings.title + ' ' + this.settings.description);
    this.url += '&url=' + encodeURIComponent(this.settings.url);
    this.url += '&counturl=' + encodeURIComponent(this.settings.url);

    this.openModal();
};

document.addEventListener('DOMContentLoaded', function () {
    let share = new Social(),
        buttons = document.querySelectorAll('[data-share-network]');
    if (!buttons.length) {
        return false;
    }

    for (let button in buttons) {
        if ({}.hasOwnProperty.call(buttons, button)) {
            if (typeof share[button.dataset.shareNetwork] === 'function') {
                button.addEventListener('click', function (e) {
                    e = e || window.event;
                    e.preventDefault();
                    share[ self.dataset.shareNetwork ]();
                });
            }
        }
    }
});
