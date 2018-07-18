(function () {
    $(document).ready(function () {
        const inter = setInterval(() => {
            let select = $('.sort-by__select')
            if (select.length) {
                select.hide()
                clearInterval(inter)
                createCustomSelect(select)
                select.show()
            }
        }, 1000)
    })

    function createCustomSelect(select) {

        let observer = new MutationObserver((mutationsList) => {
            for (let m of mutationsList) {
                if (m.type == 'childList' && m.addedNodes.length == 2 && !m.removedNodes.length) {      
                    let select = $('.sort-by__select')
                    observer.disconnect()
                    delete observer
                    createCustomSelect(select)
                }
            }
        })

        let opts = select.find('option'),
            val = select.val()
            replacer = '<ul class="sort-by__replacer" style="display: none">'

        opts.hide()
        for (let o of opts) {
            replacer += `<li data-value=${o.value}>${o.innerHTML}</li>`
        }

        replacer += '</ul>'

        select.parent().prepend(replacer)

        replacer = select.parent().find('.sort-by__replacer') 
        
        observer.observe(select.parent()[0], {
            attributes: false,
            childList: true,
            subtree: true
        })

        replacer.click('li', (e) => {
            if (e.target.tagName.toLowerCase() != 'li') return 

            onInteractWithToolbar(new Event('change'), 'sort', select.val(), e.target.dataset.value)
            select.val(e.target.dataset.value).trigger('change')
            replacer.fadeToggle(100)
        })

        $(window).click((e) => {
            if (e.target.classList.contains('sort-by__replacer') || 
                e.target.classList.contains('sort-by__select')) return
            replacer.fadeOut(100)
        })

        select.click((e) => {
            replacer.fadeToggle(100)
        })
        
    }
}());