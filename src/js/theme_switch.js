$(document).ready(() => {
    let check = 0;

    function mode(version){
        let anti_version;
        if (version == 'light'){
            anti_version = 'dark';
        }
        else{
            anti_version = 'light';
        }
        //theme attr
        $('html').attr({'theme': version})

        //text-color
        $(":root").css('color', `var(--${version}-theme-text-color)`);

        //header
        $(".header").css('background', `var(--${version}-theme-header-background-color)`);
        $("#header_third_link").addClass(`header_third_link_${version}_background`);
        $("#header_third_link").addClass(`header_third_link_${version}_text_color`);
        $("#header_third_link").removeClass('header_third_link_default_background');
        $("#header_third_link").removeClass(`header_third_link_${anti_version}_background`);
        $("#header_third_link").removeClass('header_third_link_default_text_color');
        $("#header_third_link").removeClass(`header_third_link_${anti_version}_text_color`);

        //hidden_menu
        $(".hidden_menu").css('background', `var(--${version}-theme-principle-form-background-color)`);
        
        //section
        $(".section").css('background', `var(--${version}-theme-section-background-color)`);
        $(".section-wrap:after").css('background-color', `var(--${version}-theme-after-line-color)`);
        $("html").css('background', `var(--${version}-theme-section-background-color)`);
        $(".footer").css('background', `var(--${version}-theme-section-background-color)`);

        //circle
        $(".content2_right ul > li > div").css('background', `var(--${version}-theme-circles-color)`);
        $(".content7-second-block-item-figure").addClass(`content7-second-block-item-figure-${version}-color`);
        $(".content7-second-block-item-figure").removeClass('content7-second-block-item-figure-default-color');
        $(".content7-second-block-item-figure").removeClass(`content7-second-block-item-figure-${anti_version}-color`);
        

        //form
        $(".content7-first-block").css('background', `var(--${version}-theme-form-color)`);
        $(".content3_right_wrap").css('background', `var(--${version}-theme-form-color)`);
        $(".content4_bottom_carousel_item").css('background', `var(--${version}-theme-form-color)`);
        $(".content7-cases-case").css('background', `var(--${version}-theme-form-color)`);
        
        //input_form
        $(".form_input > input").css({'background': `var(--${version}-theme-section-background-color)`, 'color': `var(--${version}-theme-text-color)`, 'border-color': `var(--${version}-theme-input-border-color)`});
        
        //tags
        $(".content7-cases-case-tags-tag").css('background', `var(--${version}-theme-tags-color)`);
        
        //logo and img
        $(`#avsn_${anti_version}_logo`).css('display', 'none');
        $(`#avsn_${version}_logo`).css('display', 'block');
        $(`#header_button_${anti_version}`).css('display', 'none');
        $(`#header_button_${version}`).css('display', 'block');
        $(`#hidden_menu_header_button_${version}`).css('display', 'block');
        $(`#hidden_menu_header_button_${anti_version}`).css('display', 'none');

        //mode_toggle
        $(`#header_mode_toggle #header_toggle_${version}`).css('display', 'block');
        $(`#header_mode_toggle #header_toggle_${anti_version}`).css('display', 'none');
        $(`#header_mode_toggle`).addClass(`header_mode_toggle_background_${version}`);
        $(`#header_mode_toggle`).removeClass(`header_mode_toggle_background_${anti_version}`);
        $(`#hidden_menu_header_toggle_switch`).addClass(`hidden_menu_header_toggle_switch_color_${version}`);
        $(`#hidden_menu_header_toggle_switch`).removeClass(`hidden_menu_header_toggle_switch_color_${anti_version}`);
        $(`#hidden_menu_header_toggle_switch`).removeClass(`hidden_menu_header_toggle_switch_color_default`);
        $(`#hidden_toggle_${version}`).css('display', 'block');
        $(`#hidden_toggle_${anti_version}`).css('display', 'none');
    }

    $("#header_mode_toggle, #hidden_menu_header_toggle_switch").on('click', ()=>{
        if ($('html').attr('theme')){
            if ($('html').attr('theme') == 'light'){
                mode('dark');
            }
            else{
                mode('light');
            }
        }
        else{
            if (window.matchMedia('(prefers-color-scheme: light)').matches){
                mode('dark');
            }
            else{
                mode('light')
            }
        }
    })
})