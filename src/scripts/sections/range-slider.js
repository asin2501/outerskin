//.bc-sf-filter-option-range-slider .noUi-origin

(function(){
    $(document).ready(function(){        
        let observer = new MutationObserver(function(mutations) {
            let controls = $(".bc-sf-filter-option-range-slider .noUi-origin");
            let first = controls[0];
            let last = controls[1];
            
            let minInput = $(".bc-sf-filter-option-range-amount-min");
            let maxInput = $(".bc-sf-filter-option-range-amount-max");

            let minValue = $(minInput).val().split(".").shift();

            if(minValue[0] !== '$'){
                minValue = '$' + minValue;
            }

            let maxValue = $(maxInput).val().split(".").shift();

            if(maxValue[0] !== '$'){
                maxValue = '$' + maxValue;
            }
            
            let priceRangeSpan = $(".bc-sf-filter-option-block-price .bc-sf-filter-block-title");
            
            $(priceRangeSpan).append(`<div id="price-range-container" class="price-range">${minValue} - ${maxValue}</div>`);
            let priceRangeContainer = $("#price-range-container");
            
            $(first).append(`<span id="range-slider-left-number" class="range-slider-arrow-number">${ minValue }</span>`);
            $(last).append(`<span id="range-slider-right-number" class="range-slider-arrow-number">${ maxValue }</span>`);

            
            let changeOrientation = function(){
                let rangeSlider = $(".noUi-connect");
                
                if($(rangeSlider).width() < 0.35 * $(".collection__size-footer").parent().width()){
                    $("#range-slider-left-number").addClass("range-slider-left-number-reverse");
                    $("#range-slider-right-number").addClass("range-slider-right-number-reverse");
                }else{
                    $("#range-slider-left-number").removeClass("range-slider-left-number-reverse");
                    $("#range-slider-right-number").removeClass("range-slider-right-number-reverse");
                }
            };
            
            setTimeout(changeOrientation, 250);
            
            let changeRange = function(event){
                let minValue = $(minInput).val().split(".").shift();
            
                if(minValue[0] !== '$'){
                    minValue = '$' + minValue;
                }
                
                let maxValue = $(maxInput).val().split(".").shift();
                
                if(maxValue[0] !== '$'){
                    maxValue = '$' + maxValue;
                }
                
                $("#range-slider-left-number").html(minValue);
                $("#range-slider-right-number").html(maxValue);
                
                $(priceRangeContainer).html(`${minValue} - ${maxValue}`);
                
                changeOrientation();
                return false;
            }
            
            $(".bc-sf-filter-option-range-amount-min, .bc-sf-filter-option-range-amount-max").attr("disabled", true);
            
            $(".noUi-handle").bind("mousedown", function(){
                window.addEventListener("mousemove", changeRange);
            });
            
            $(window).bind("touchmove", function(event){
                if(event.target.classList.contains("noUi-handle")){
                    changeRange();
                }
            });
            
            $(window).bind("mouseup", function(){
                window.removeEventListener("mousemove", changeRange);
            });
        });
        
        if(document.getElementById("bc-sf-filter-tree") !== null){
            observer.observe(document.getElementById("bc-sf-filter-tree"), { childList: true });
        }
    });
})();