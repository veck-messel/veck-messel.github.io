const div_root = document.getElementById("root");
const conveyer = document.getElementById("conveyer");
const viewed_window = document.getElementById("viewed");

let div_root_width, conveyer_width, move_delta, current_shift, viewed_window_width, shear, shear_level;
conveyer.style = "right: 0px";

gather_geometry_data_of_carousel();

function move_left() {
    let right_piece = conveyer_width - viewed_window_width - current_shift;
    if (right_piece > 1 && shear > 1){

        current_shift += move_delta;
        shear = shear - move_delta;
        strok = "right: " + current_shift + "px;";
        conveyer.style = strok;
        requestAnimationFrame(move_left);
    }
    else{
        update_shear();
    }
}

function move_right() {
    let left_piece = current_shift;
    if (left_piece > 1 && shear > 1){
        current_shift -= move_delta;
        shear = shear - move_delta;
        strok = "right: " + current_shift + "px;";
        conveyer.style = strok;
        requestAnimationFrame(move_right);
    }
    else{
         update_shear();
    }
}


function gather_geometry_data_of_carousel(){
    div_root_width = div_root.scrollWidth;
    conveyer_width = conveyer.scrollWidth;
    viewed_window_width = viewed_window.clientWidth;
    move_delta = conveyer_width/300;
    current_shift = 0;
    update_shear();
}

function update_shear(){
    div_root_width = div_root.scrollWidth;
    if (div_root_width > 1200){
        shear = viewed_window_width/4;
        shear_level = 1;
    }
    else if (div_root_width > 1000){
        shear = viewed_window_width/3;
        shear_level = 2;
    }
    else if (div_root_width > 600){
        shear = viewed_window_width/2;
        shear_level = 3;
    }
    else{
        shear = viewed_window_width;
        shear_level = 4;
    }    
}

function resizing(){
    let prev_window_width = viewed_window_width;
    let prev_current_shift = current_shift;
    let prev_shear = shear;
    let prev_shear_level = shear_level;
    gather_geometry_data_of_carousel();
    if (prev_current_shift > 0){
        if (prev_shear != shear){
            if (prev_shear < shear){
                current_shift = (shear/prev_shear) * (prev_current_shift + prev_shear * (shear_level - prev_shear_level));
            }
            else{
                current_shift = (shear/prev_shear) * (prev_current_shift - prev_shear * (prev_shear_level - shear_level));
                current_shift = (current_shift <= 0) ? 0: current_shift
                }    
        }
        else{
            let relation = prev_current_shift/prev_window_width;
            current_shift = relation*viewed_window_width;
        }
        strok = "right: " + current_shift + "px;";
        conveyer.style = strok;
    }
}