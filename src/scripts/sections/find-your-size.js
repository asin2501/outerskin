(function(){
    $(document).ready(function(){
        var observer = new MutationObserver(function(mutations) {
            let el = $(".bc-sf-filter-option-block-size");
            let clone = $("#find-your-size-button").clone();
            $(clone).css("display", "block");
            $(clone).removeAttr("id");
            let parrent = $(el).find(".bc-sf-filter-block-title");
            
            $(clone).appendTo(parrent);
        });
        
        if(document.getElementById("bc-sf-filter-tree") !== null){
            observer.observe(document.getElementById("bc-sf-filter-tree"), { childList: true });
        }
    });
})();