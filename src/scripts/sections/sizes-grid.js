(function(){
    $(document).ready(function(){
        var observer = new MutationObserver(function(mutations) {
            let container = $(".bc-sf-filter-option-block-size .bc-sf-filter-option-box");
            let counter = 0;
            $(container).find("li").each(function(index, el){
                $(el).removeAttr("style");
                counter++;
                if(index % 5 === 4){
                    $(el).after("<li></li>");
                }
            });
            
            for(let i = 0; i < 5 * (Math.floor(counter / 5) + 1) - counter; i++){
                $(container).append("<li class='empty'></li>");
            }
            
            let alignColumns = function(index){
                let items = $(container).find(`li:nth-child(6n + ${index})`);
                let maxWidth = 0;
                $(items).each(function(index, el){
                    let width = $(el).width();
                    if(maxWidth < width){
                        maxWidth = width;
                    }
                });

                $(items).width(maxWidth);
            }
            
            for(let i = 1; i <= 5; i++){
                alignColumns(i);
            }
        });
        
        if(document.getElementById("bc-sf-filter-tree") !== null){
            observer.observe(document.getElementById("bc-sf-filter-tree"), { childList: true });
        }
    });
})();