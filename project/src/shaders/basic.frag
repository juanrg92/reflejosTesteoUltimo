precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D uTexture;
uniform float time;
uniform float value0;
uniform float value1;
uniform float value2;
uniform float value3;
uniform float value4;
uniform float value5;
uniform float value6;
uniform float value7;
uniform float value8;
uniform float value9;
uniform float tt;
uniform float escalaOndas;
uniform float escalaRand;
uniform float movimiento;
vec2 params = vec2(2.5, 10.0);

const float radius = 3.0;
const float power_radius = radius * radius;
const int intensity_level = 20;

#define NUM_OCTAVES 5




float random (in vec2 st) {
    return fract(sin(dot(st.xy,
    vec2(12.9898,78.233)))
    * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));


    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x) +
    (c - a)* u.y * (1.0 - u.x) +
    (d - b) * u.x * u.y;
}





float wave(vec2 pos, float t, float freq, float numWaves, vec2 center) {
    float d = length(pos - center);
    d = log(1.0 + exp(d*0.5)); ////////////////////////tamaño radio 1.0
    return 1.0/(1.0+20.0*d*d) * ////////////////////////20.0 (mitad)
    sin(8.0*3.1415*(-numWaves*d + t*freq*movimiento+noise(tt+pos*escalaRand)*1.  )) ;

//+ noise(tt + pos*4.0)*0.6

//quitar (5 - 0.3) noise function + noise(pos*4.0)*2.6
////////////////////////ripples (principio) 4.0
}



float height(vec2 pos, float t) {
    float w;
    float ondas = escalaOndas;  //escalaOndas
    float ondas0 = 3.;
    w =  wave(pos, t, params.x, ondas, vec2(value0, -value1)); //params.y en ondas
    w += wave(pos, t, params.x,ondas, -vec2(value2, -value3));
    w += wave(pos, t, params.x, ondas, -vec2(value4,-value5));
    w += wave(pos, t, params.x, ondas, -vec2(value6,-value7));
//w += wave(pos, t, params.x, ondas, -vec2(value8,-value9));  
    return w;
}


vec2 normal(vec2 pos, float t) {
    return  vec2(height(pos - vec2(0.05, 0), t) - height(pos, t), 
    height(pos - vec2(0, 0.05), t) - height(pos, t));
}




void main() {

    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    vec2 uv0 = vTexCoord;
    uv0.y = 1.0 - uv0.y;

    params = vec2(2.5, 10.0);
    vec2 uvn = 2.0*uv - vec2(1.0);  
    uv += normal(uvn, time*0.0015);

///////////////////////////////////////////////////////


    int intensity_count[intensity_level];
    vec4 average_color[intensity_level];

    for (int i = 0; i < intensity_level; ++i) {
        intensity_count[i] = 0;
        average_color[i] = vec4(0.0, 0.0, 0.0, 1.0);
    }




    for (float x = -radius; x < radius; ++x) {
        for (float y = -radius; y < radius; ++y) {
            vec2 abs_pos = vec2(x, y);
            if (power_radius < dot(abs_pos, abs_pos))
                continue;
            vec2 pos = (abs_pos / 150.0) + vec2(uv.x, uv.y) + noise(tt + uv*40.)*0.04; //40 - 0.05 valores


            vec4 col_element = texture2D(uTexture, pos);

            int current_intensity = int(
            (dot(col_element, vec4(1.0, 1.0, 1.0, 0.0)) / 3.0) * 
            float(intensity_level)
            );
            current_intensity = (current_intensity >= intensity_level) ?
            intensity_level - 1 :
            current_intensity;
            for (int i = 0; i < intensity_level; ++i) {
                if (i == current_intensity) {
                    intensity_count[i] += 1;
                    average_color[i] += col_element;
                    break;
                }
            }
        }
    }



    int max_level = 0;

    vec4 col_out = vec4(0.0, 0.0, 0.0, 1.0);

    for (int level = 0; level < intensity_level; ++level) {
        if (intensity_count[level] > max_level) {
            max_level = intensity_count[level];
            col_out = average_color[level] / float(max_level);
        }
    }

    float mdf = 0.15; 
    float noise0 = (fract(sin(dot(uv0, vec2(12.9898,78.233)*2.0)) * 43758.5453));

    vec4 col_out0 = col_out - noise0*mdf;



///////////////////////////////////////////////////////



    //vec4 color = texture2D(uTexture,vec2(1.0-uv.x, uv.y) + noise(uv*75.)*0.1);




    gl_FragColor = col_out0;

}