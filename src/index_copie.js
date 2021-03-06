require('./style.css');

/**
 * TODO 
 * couleurs adaptées via les tableaux
 * $$DONE$$ -> débug animation
 * faire le mode "non optim"
 * créer un constructeur d'objet "graphs" qui va permettre :
 * 		- de générer des canvas 
 * 		- associer à ce graphs ses @params
 * 		- possède une méthode Draw (qui est le draw actuel)
 * 		- gère les entrer sourie
 **/


        //////////////////////////////////////////////////
        //       List of differents color Scaling       //
        //////////////////////////////////////////////////
/*
    var magentaScale = [];
    var heatScale    = [];
    var btcScale     = [];
    var ocsScale     = [];
    var rainbowScale = [];
    var locsScale    = [];
    var btyScale     = [];
    var lingreyScale = [];
    var rScale       = [];
    var gScale       = [];
    var bScale       = [];
    var xScale       = [];

    magentaScale[  0]=[   0,   0,   0];heatScale[  0]=[   0,   0,   0];rScale[  0]=[  0,0,0];gScale[  0]=[0,  0,0];bScale[  0]=[0,0,  0];    ocsScale[0]=[0,0,0];        rainbowScale[0]=[0,0,0];        btcScale[0]=[0,0,0];        btyScale[0]=[7,7,254];      lingreyScale[0]=[0,0,0];        locsScale[0]=[0,0,0];
    magentaScale[  1]=[  40,   0,   0];heatScale[  1]=[  35,   0,   0];rScale[  1]=[  1,0,0];gScale[  1]=[0,  1,0];bScale[  1]=[0,0,  1];    ocsScale[1]=[4,0,0];        rainbowScale[1]=[45,0,36];      btcScale[1]=[0,0,40];       btyScale[1]=[23,23,252];    lingreyScale[1]=[0,0,0];        locsScale[1]=[0,0,0];
    magentaScale[  2]=[  56,   0,   4];heatScale[  2]=[  52,   0,   0];rScale[  2]=[  2,0,0];gScale[  2]=[0,  2,0];bScale[  2]=[0,0,  2];    ocsScale[2]=[8,0,0];        rainbowScale[2]=[56,0,46];      btcScale[2]=[0,4,56];       btyScale[2]=[30,30,250];    lingreyScale[2]=[0,0,0];        locsScale[2]=[0,0,0];
    magentaScale[  3]=[  61,   0,   9];heatScale[  3]=[  60,   0,   0];rScale[  3]=[  3,0,0];gScale[  3]=[0,  3,0];bScale[  3]=[0,0,  3];    ocsScale[3]=[12,0,0];       rainbowScale[3]=[60,0,49];      btcScale[3]=[0,9,61];       btyScale[3]=[36,36,248];    lingreyScale[3]=[0,0,0];        locsScale[3]=[1,0,0];
    magentaScale[  4]=[  64,   0,  12];heatScale[  4]=[  63,   1,   0];rScale[  4]=[  4,0,0];gScale[  4]=[0,  4,0];bScale[  4]=[0,0,  4];    ocsScale[4]=[16,0,0];       rainbowScale[4]=[67,0,54];      btcScale[4]=[0,12,64];      btyScale[4]=[40,40,247];    lingreyScale[4]=[0,0,0];        locsScale[4]=[2,0,0];
    magentaScale[  5]=[  66,   0,  14];heatScale[  5]=[  64,   2,   0];rScale[  5]=[  5,0,0];gScale[  5]=[0,  5,0];bScale[  5]=[0,0,  5];    ocsScale[5]=[20,0,0];       rainbowScale[5]=[70,0,59];      btcScale[5]=[0,14,66];      btyScale[5]=[44,44,245];    lingreyScale[5]=[0,0,0];        locsScale[5]=[2,0,0];
    magentaScale[  6]=[  69,   0,  17];heatScale[  6]=[  68,   5,   0];rScale[  6]=[  6,0,0];gScale[  6]=[0,  6,0];bScale[  6]=[0,0,  6];    ocsScale[6]=[24,0,0];       rainbowScale[6]=[71,0,61];      btcScale[6]=[0,17,69];      btyScale[6]=[47,47,243];    lingreyScale[6]=[0,0,0];        locsScale[6]=[3,0,0];
    magentaScale[  7]=[  73,   0,  20];heatScale[  7]=[  69,   6,   0];rScale[  7]=[  7,0,0];gScale[  7]=[0,  7,0];bScale[  7]=[0,0,  7];    ocsScale[7]=[28,0,0];       rainbowScale[7]=[75,0,68];      btcScale[7]=[0,20,73];      btyScale[7]=[50,50,242];    lingreyScale[7]=[1,1,1];        locsScale[7]=[3,0,0];
    magentaScale[  8]=[  74,   0,  22];heatScale[  8]=[  72,   8,   0];rScale[  8]=[  8,0,0];gScale[  8]=[0,  8,0];bScale[  8]=[0,0,  8];    ocsScale[8]=[32,0,0];       rainbowScale[8]=[74,0,73];      btcScale[8]=[0,22,74];      btyScale[8]=[52,52,240];    lingreyScale[8]=[1,1,1];        locsScale[8]=[4,0,0];
    magentaScale[  9]=[  78,   0,  25];heatScale[  9]=[  74,  10,   0];rScale[  9]=[  9,0,0];gScale[  9]=[0,  9,0];bScale[  9]=[0,0,  9];    ocsScale[9]=[36,0,0];       rainbowScale[9]=[74,0,77];      btcScale[9]=[0,25,78];      btyScale[9]=[55,55,239];    lingreyScale[9]=[1,1,1];        locsScale[9]=[5,0,0];
    magentaScale[ 10]=[  79,   0,  27];heatScale[ 10]=[  77,  12,   0];rScale[ 10]=[ 10,0,0];gScale[ 10]=[0, 10,0];bScale[ 10]=[0,0, 10];    ocsScale[10]=[40,0,0];      rainbowScale[10]=[73,0,81];     btcScale[10]=[0,27,79];     btyScale[10]=[57,57,238];   lingreyScale[10]=[1,1,1];       locsScale[10]=[5,0,0];
    magentaScale[ 11]=[  83,   0,  30];heatScale[ 11]=[  78,  14,   0];rScale[ 11]=[ 11,0,0];gScale[ 11]=[0, 11,0];bScale[ 11]=[0,0, 11];    ocsScale[11]=[44,0,0];      rainbowScale[11]=[71,0,87];     btcScale[11]=[0,30,83];     btyScale[11]=[59,59,236];   lingreyScale[11]=[1,1,1];       locsScale[11]=[6,0,0];
    magentaScale[ 12]=[  85,   0,  31];heatScale[ 12]=[  81,  16,   0];rScale[ 12]=[ 12,0,0];gScale[ 12]=[0, 12,0];bScale[ 12]=[0,0, 12];    ocsScale[12]=[48,0,0];      rainbowScale[12]=[69,1,90];     btcScale[12]=[0,31,85];     btyScale[12]=[61,61,235];   lingreyScale[12]=[1,1,1];       locsScale[12]=[7,0,0];
    magentaScale[ 13]=[  86,   0,  33];heatScale[ 13]=[  83,  17,   0];rScale[ 13]=[ 13,0,0];gScale[ 13]=[0, 13,0];bScale[ 13]=[0,0, 13];    ocsScale[13]=[52,0,0];      rainbowScale[13]=[68,2,94];     btcScale[13]=[0,33,86];     btyScale[13]=[63,63,234];   lingreyScale[13]=[1,1,1];       locsScale[13]=[7,0,0];
    magentaScale[ 14]=[  90,   0,  36];heatScale[ 14]=[  85,  19,   0];rScale[ 14]=[ 14,0,0];gScale[ 14]=[0, 14,0];bScale[ 14]=[0,0, 14];    ocsScale[14]=[56,0,0];      rainbowScale[14]=[66,3,97];     btcScale[14]=[0,36,90];     btyScale[14]=[65,65,233];   lingreyScale[14]=[1,1,1];       locsScale[14]=[8,0,0];
    magentaScale[ 15]=[  91,   0,  38];heatScale[ 15]=[  86,  20,   0];rScale[ 15]=[ 15,0,0];gScale[ 15]=[0, 15,0];bScale[ 15]=[0,0, 15];    ocsScale[15]=[60,0,0];      rainbowScale[15]=[63,6,102];    btcScale[15]=[0,38,91];     btyScale[15]=[66,66,231];   lingreyScale[15]=[1,1,1];       locsScale[15]=[9,0,0];
    magentaScale[ 16]=[  93,   0,  39];heatScale[ 16]=[  89,  22,   0];rScale[ 16]=[ 16,0,0];gScale[ 16]=[0, 16,0];bScale[ 16]=[0,0, 16];    ocsScale[16]=[64,0,0];      rainbowScale[16]=[61,7,106];    btcScale[16]=[0,39,93];     btyScale[16]=[68,68,230];   lingreyScale[16]=[2,2,2];       locsScale[16]=[9,0,0];
    magentaScale[ 17]=[  95,   0,  41];heatScale[ 17]=[  91,  24,   0];rScale[ 17]=[ 17,0,0];gScale[ 17]=[0, 17,0];bScale[ 17]=[0,0, 17];    ocsScale[17]=[68,0,0];      rainbowScale[17]=[58,10,109];   btcScale[17]=[0,41,95];     btyScale[17]=[69,69,229];   lingreyScale[17]=[2,2,2];       locsScale[17]=[10,0,0];
    magentaScale[ 18]=[  96,   0,  43];heatScale[ 18]=[  92,  25,   0];rScale[ 18]=[ 18,0,0];gScale[ 18]=[0, 18,0];bScale[ 18]=[0,0, 18];    ocsScale[18]=[72,0,0];      rainbowScale[18]=[56,12,113];   btcScale[18]=[0,43,96];     btyScale[18]=[71,71,228];   lingreyScale[18]=[2,2,2];       locsScale[18]=[11,0,0];
    magentaScale[ 19]=[ 100,   0,  46];heatScale[ 19]=[  94,  26,   0];rScale[ 19]=[ 19,0,0];gScale[ 19]=[0, 19,0];bScale[ 19]=[0,0, 19];    ocsScale[19]=[76,0,0];      rainbowScale[19]=[53,15,116];   btcScale[19]=[0,46,100];    btyScale[19]=[72,72,227];   lingreyScale[19]=[2,2,2];       locsScale[19]=[12,0,0];
    magentaScale[ 20]=[ 102,   0,  47];heatScale[ 20]=[  95,  28,   0];rScale[ 20]=[ 20,0,0];gScale[ 20]=[0, 20,0];bScale[ 20]=[0,0, 20];    ocsScale[20]=[80,0,0];      rainbowScale[20]=[48,18,119];   btcScale[20]=[0,47,102];    btyScale[20]=[74,74,226];   lingreyScale[20]=[2,2,2];       locsScale[20]=[13,0,0];
    magentaScale[ 21]=[ 103,   0,  49];heatScale[ 21]=[  98,  30,   0];rScale[ 21]=[ 21,0,0];gScale[ 21]=[0, 21,0];bScale[ 21]=[0,0, 21];    ocsScale[21]=[84,0,0];      rainbowScale[21]=[47,20,121];   btcScale[21]=[0,49,103];    btyScale[21]=[75,75,225];   lingreyScale[21]=[2,2,2];       locsScale[21]=[14,0,0];
    magentaScale[ 22]=[ 105,   0,  51];heatScale[ 22]=[ 100,  31,   0];rScale[ 22]=[ 22,0,0];gScale[ 22]=[0, 22,0];bScale[ 22]=[0,0, 22];    ocsScale[22]=[88,0,0];      rainbowScale[22]=[44,23,124];   btcScale[22]=[0,51,105];    btyScale[22]=[76,76,225];   lingreyScale[22]=[2,2,2];       locsScale[22]=[15,0,0];
    magentaScale[ 23]=[ 107,   0,  52];heatScale[ 23]=[ 102,  33,   0];rScale[ 23]=[ 23,0,0];gScale[ 23]=[0, 23,0];bScale[ 23]=[0,0, 23];    ocsScale[23]=[92,0,0];      rainbowScale[23]=[41,27,128];   btcScale[23]=[0,52,107];    btyScale[23]=[78,78,224];   lingreyScale[23]=[3,3,3];       locsScale[23]=[16,0,0];
    magentaScale[ 24]=[ 108,   0,  54];heatScale[ 24]=[ 103,  34,   0];rScale[ 24]=[ 24,0,0];gScale[ 24]=[0, 24,0];bScale[ 24]=[0,0, 24];    ocsScale[24]=[96,0,0];      rainbowScale[24]=[40,28,129];   btcScale[24]=[0,54,108];    btyScale[24]=[79,79,223];   lingreyScale[24]=[3,3,3];       locsScale[24]=[17,0,0];
    magentaScale[ 25]=[ 110,   0,  55];heatScale[ 25]=[ 105,  35,   0];rScale[ 25]=[ 25,0,0];gScale[ 25]=[0, 25,0];bScale[ 25]=[0,0, 25];    ocsScale[25]=[100,0,0];     rainbowScale[25]=[37,32,132];   btcScale[25]=[0,55,110];    btyScale[25]=[80,80,222];   lingreyScale[25]=[3,3,3];       locsScale[25]=[18,0,0];
    magentaScale[ 26]=[ 112,   0,  57];heatScale[ 26]=[ 106,  36,   0];rScale[ 26]=[ 26,0,0];gScale[ 26]=[0, 26,0];bScale[ 26]=[0,0, 26];    ocsScale[26]=[104,0,0];     rainbowScale[26]=[34,36,134];   btcScale[26]=[0,57,112];    btyScale[26]=[81,81,221];   lingreyScale[26]=[3,3,3];       locsScale[26]=[19,0,0];
    magentaScale[ 27]=[ 112,   0,  57];heatScale[ 27]=[ 108,  38,   0];rScale[ 27]=[ 27,0,0];gScale[ 27]=[0, 27,0];bScale[ 27]=[0,0, 27];    ocsScale[27]=[108,0,0];     rainbowScale[27]=[29,43,137];   btcScale[27]=[0,57,112];    btyScale[27]=[82,82,221];   lingreyScale[27]=[3,3,3];       locsScale[27]=[20,0,0];
    magentaScale[ 28]=[ 113,   0,  58];heatScale[ 28]=[ 109,  39,   0];rScale[ 28]=[ 28,0,0];gScale[ 28]=[0, 28,0];bScale[ 28]=[0,0, 28];    ocsScale[28]=[112,0,0];     rainbowScale[28]=[25,52,138];   btcScale[28]=[0,58,113];    btyScale[28]=[84,84,220];   lingreyScale[28]=[3,3,3];       locsScale[28]=[21,0,0];
    magentaScale[ 29]=[ 115,   0,  60];heatScale[ 29]=[ 111,  40,   0];rScale[ 29]=[ 29,0,0];gScale[ 29]=[0, 29,0];bScale[ 29]=[0,0, 29];    ocsScale[29]=[116,0,0];     rainbowScale[29]=[24,57,139];   btcScale[29]=[0,60,115];    btyScale[29]=[85,85,219];   lingreyScale[29]=[3,3,3];       locsScale[29]=[22,0,0];
    magentaScale[ 30]=[ 117,   0,  62];heatScale[ 30]=[ 112,  42,   0];rScale[ 30]=[ 30,0,0];gScale[ 30]=[0, 30,0];bScale[ 30]=[0,0, 30];    ocsScale[30]=[120,3,0];     rainbowScale[30]=[24,62,141];   btcScale[30]=[0,62,117];    btyScale[30]=[86,86,218];   lingreyScale[30]=[4,4,4];       locsScale[30]=[23,0,0];
    magentaScale[ 31]=[ 119,   0,  63];heatScale[ 31]=[ 114,  43,   0];rScale[ 31]=[ 31,0,0];gScale[ 31]=[0, 31,0];bScale[ 31]=[0,0, 31];    ocsScale[31]=[120,5,0];     rainbowScale[31]=[24,64,142];   btcScale[31]=[0,63,119];    btyScale[31]=[87,87,218];   lingreyScale[31]=[4,4,4];       locsScale[31]=[25,0,0];
    magentaScale[ 32]=[ 120,   0,  65];heatScale[ 32]=[ 115,  44,   0];rScale[ 32]=[ 32,0,0];gScale[ 32]=[0, 32,0];bScale[ 32]=[0,0, 32];    ocsScale[32]=[120,8,0];     rainbowScale[32]=[23,65,142];   btcScale[32]=[0,65,120];    btyScale[32]=[88,88,217];   lingreyScale[32]=[4,4,4];       locsScale[32]=[26,0,0];
    magentaScale[ 33]=[ 122,   0,  66];heatScale[ 33]=[ 117,  45,   0];rScale[ 33]=[ 33,0,0];gScale[ 33]=[0, 33,0];bScale[ 33]=[0,0, 33];    ocsScale[33]=[120,10,0];    rainbowScale[33]=[23,69,143];   btcScale[33]=[0,66,122];    btyScale[33]=[89,89,216];   lingreyScale[33]=[4,4,4];       locsScale[33]=[27,0,0];
    magentaScale[ 34]=[ 124,   0,  68];heatScale[ 34]=[ 119,  47,   0];rScale[ 34]=[ 34,0,0];gScale[ 34]=[0, 34,0];bScale[ 34]=[0,0, 34];    ocsScale[34]=[120,13,0];    rainbowScale[34]=[23,71,142];   btcScale[34]=[0,68,124];    btyScale[34]=[90,90,216];   lingreyScale[34]=[4,4,4];       locsScale[34]=[28,0,0];
    magentaScale[ 35]=[ 125,   0,  70];heatScale[ 35]=[ 119,  47,   0];rScale[ 35]=[ 35,0,0];gScale[ 35]=[0, 35,0];bScale[ 35]=[0,0, 35];    ocsScale[35]=[120,15,0];    rainbowScale[35]=[23,71,142];   btcScale[35]=[0,70,125];    btyScale[35]=[91,91,215];   lingreyScale[35]=[5,5,5];       locsScale[35]=[30,0,0];
    magentaScale[ 36]=[ 127,   0,  71];heatScale[ 36]=[ 120,  48,   0];rScale[ 36]=[ 36,0,0];gScale[ 36]=[0, 36,0];bScale[ 36]=[0,0, 36];    ocsScale[36]=[120,18,0];    rainbowScale[36]=[23,73,142];   btcScale[36]=[0,71,127];    btyScale[36]=[92,92,214];   lingreyScale[36]=[5,5,5];       locsScale[36]=[31,0,0];
    magentaScale[ 37]=[ 129,   0,  73];heatScale[ 37]=[ 122,  49,   0];rScale[ 37]=[ 37,0,0];gScale[ 37]=[0, 37,0];bScale[ 37]=[0,0, 37];    ocsScale[37]=[120,20,0];    rainbowScale[37]=[23,75,142];   btcScale[37]=[0,73,129];    btyScale[37]=[93,93,214];   lingreyScale[37]=[5,5,5];       locsScale[37]=[33,0,0];
    magentaScale[ 38]=[ 129,   0,  73];heatScale[ 38]=[ 123,  51,   0];rScale[ 38]=[ 38,0,0];gScale[ 38]=[0, 38,0];bScale[ 38]=[0,0, 38];    ocsScale[38]=[120,23,0];    rainbowScale[38]=[23,75,142];   btcScale[38]=[0,73,129];    btyScale[38]=[94,94,213];   lingreyScale[38]=[5,5,5];       locsScale[38]=[34,0,0];
    magentaScale[ 39]=[ 130,   0,  74];heatScale[ 39]=[ 125,  52,   0];rScale[ 39]=[ 39,0,0];gScale[ 39]=[0, 39,0];bScale[ 39]=[0,0, 39];    ocsScale[39]=[120,25,0];    rainbowScale[39]=[23,78,142];   btcScale[39]=[0,74,130];    btyScale[39]=[95,95,213];   lingreyScale[39]=[5,5,5];       locsScale[39]=[35,0,0];
    magentaScale[ 40]=[ 132,   0,  76];heatScale[ 40]=[ 125,  52,   0];rScale[ 40]=[ 40,0,0];gScale[ 40]=[0, 40,0];bScale[ 40]=[0,0, 40];    ocsScale[40]=[120,28,0];    rainbowScale[40]=[23,80,142];   btcScale[40]=[0,76,132];    btyScale[40]=[96,96,212];   lingreyScale[40]=[6,6,6];       locsScale[40]=[37,0,0];
    magentaScale[ 41]=[ 134,   0,  78];heatScale[ 41]=[ 126,  53,   0];rScale[ 41]=[ 41,0,0];gScale[ 41]=[0, 41,0];bScale[ 41]=[0,0, 41];    ocsScale[41]=[120,30,0];    rainbowScale[41]=[23,80,142];   btcScale[41]=[0,78,134];    btyScale[41]=[97,97,212];   lingreyScale[41]=[6,6,6];       locsScale[41]=[39,0,0];
    magentaScale[ 42]=[ 136,   0,  79];heatScale[ 42]=[ 128,  54,   0];rScale[ 42]=[ 42,0,0];gScale[ 42]=[0, 42,0];bScale[ 42]=[0,0, 42];    ocsScale[42]=[120,33,0];    rainbowScale[42]=[23,82,141];   btcScale[42]=[0,79,136];    btyScale[42]=[98,98,211];   lingreyScale[42]=[6,6,6];       locsScale[42]=[40,0,0];
    magentaScale[ 43]=[ 137,   0,  81];heatScale[ 43]=[ 129,  56,   0];rScale[ 43]=[ 43,0,0];gScale[ 43]=[0, 43,0];bScale[ 43]=[0,0, 43];    ocsScale[43]=[120,35,0];    rainbowScale[43]=[23,85,141];   btcScale[43]=[0,81,137];    btyScale[43]=[98,98,210];   lingreyScale[43]=[6,6,6];       locsScale[43]=[43,0,0];
    magentaScale[ 44]=[ 139,   0,  82];heatScale[ 44]=[ 129,  56,   0];rScale[ 44]=[ 44,0,0];gScale[ 44]=[0, 44,0];bScale[ 44]=[0,0, 44];    ocsScale[44]=[120,38,0];    rainbowScale[44]=[23,85,141];   btcScale[44]=[0,82,139];    btyScale[44]=[99,99,210];   lingreyScale[44]=[6,6,6];       locsScale[44]=[45,0,0];
    magentaScale[ 45]=[ 141,   0,  84];heatScale[ 45]=[ 131,  57,   0];rScale[ 45]=[ 45,0,0];gScale[ 45]=[0, 45,0];bScale[ 45]=[0,0, 45];    ocsScale[45]=[120,40,0];    rainbowScale[45]=[23,87,140];   btcScale[45]=[0,84,141];    btyScale[45]=[100,100,209]; lingreyScale[45]=[7,7,7];       locsScale[45]=[46,0,0];
    magentaScale[ 46]=[ 142,   0,  86];heatScale[ 46]=[ 132,  58,   0];rScale[ 46]=[ 46,0,0];gScale[ 46]=[0, 46,0];bScale[ 46]=[0,0, 46];    ocsScale[46]=[120,43,0];    rainbowScale[46]=[23,87,140];   btcScale[46]=[0,86,142];    btyScale[46]=[101,101,209]; lingreyScale[46]=[7,7,7];       locsScale[46]=[49,0,0];
    magentaScale[ 47]=[ 144,   0,  87];heatScale[ 47]=[ 134,  59,   0];rScale[ 47]=[ 47,0,0];gScale[ 47]=[0, 47,0];bScale[ 47]=[0,0, 47];    ocsScale[47]=[120,45,0];    rainbowScale[47]=[24,90,140];   btcScale[47]=[0,87,144];    btyScale[47]=[102,102,208]; lingreyScale[47]=[7,7,7];       locsScale[47]=[51,0,0];
    magentaScale[ 48]=[ 146,   0,  89];heatScale[ 48]=[ 134,  59,   0];rScale[ 48]=[ 48,0,0];gScale[ 48]=[0, 48,0];bScale[ 48]=[0,0, 48];    ocsScale[48]=[120,48,0];    rainbowScale[48]=[24,90,140];   btcScale[48]=[0,89,146];    btyScale[48]=[103,103,208]; lingreyScale[48]=[7,7,7];       locsScale[48]=[53,0,0];
    magentaScale[ 49]=[ 147,   0,  90];heatScale[ 49]=[ 136,  61,   0];rScale[ 49]=[ 49,0,0];gScale[ 49]=[0, 49,0];bScale[ 49]=[0,0, 49];    ocsScale[49]=[120,50,0];    rainbowScale[49]=[24,93,139];   btcScale[49]=[0,90,147];    btyScale[49]=[104,104,208]; lingreyScale[49]=[7,7,7];       locsScale[49]=[54,0,0];
    magentaScale[ 50]=[ 149,   0,  92];heatScale[ 50]=[ 137,  62,   0];rScale[ 50]=[ 50,0,0];gScale[ 50]=[0, 50,0];bScale[ 50]=[0,0, 50];    ocsScale[50]=[120,53,0];    rainbowScale[50]=[24,93,139];   btcScale[50]=[0,92,149];    btyScale[50]=[105,105,207]; lingreyScale[50]=[8,8,8];       locsScale[50]=[56,0,0];
    magentaScale[ 51]=[ 151,   0,  94];heatScale[ 51]=[ 137,  62,   0];rScale[ 51]=[ 51,0,0];gScale[ 51]=[0, 51,0];bScale[ 51]=[0,0, 51];    ocsScale[51]=[120,55,0];    rainbowScale[51]=[24,93,139];   btcScale[51]=[0,94,151];    btyScale[51]=[105,105,207]; lingreyScale[51]=[8,8,8];       locsScale[51]=[58,0,0];
    magentaScale[ 52]=[ 151,   0,  94];heatScale[ 52]=[ 139,  63,   0];rScale[ 52]=[ 52,0,0];gScale[ 52]=[0, 52,0];bScale[ 52]=[0,0, 52];    ocsScale[52]=[120,58,0];    rainbowScale[52]=[24,93,139];   btcScale[52]=[0,94,151];    btyScale[52]=[106,106,206]; lingreyScale[52]=[9,9,9];       locsScale[52]=[60,0,0];
    magentaScale[ 53]=[ 153,   0,  95];heatScale[ 53]=[ 139,  63,   0];rScale[ 53]=[ 53,0,0];gScale[ 53]=[0, 53,0];bScale[ 53]=[0,0, 53];    ocsScale[53]=[120,60,0];    rainbowScale[53]=[24,97,139];   btcScale[53]=[0,95,153];    btyScale[53]=[107,107,206]; lingreyScale[53]=[9,9,9];       locsScale[53]=[62,0,0];
    magentaScale[ 54]=[ 154,   0,  97];heatScale[ 54]=[ 140,  65,   0];rScale[ 54]=[ 54,0,0];gScale[ 54]=[0, 54,0];bScale[ 54]=[0,0, 54];    ocsScale[54]=[120,63,0];    rainbowScale[54]=[24,97,139];   btcScale[54]=[0,97,154];    btyScale[54]=[108,108,205]; lingreyScale[54]=[9,9,9];       locsScale[54]=[64,0,0];
    magentaScale[ 55]=[ 156,   0,  98];heatScale[ 55]=[ 142,  66,   0];rScale[ 55]=[ 55,0,0];gScale[ 55]=[0, 55,0];bScale[ 55]=[0,0, 55];    ocsScale[55]=[120,65,0];    rainbowScale[55]=[25,101,138];  btcScale[55]=[0,98,156];    btyScale[55]=[109,109,205]; lingreyScale[55]=[9,9,9];       locsScale[55]=[67,0,0];
    magentaScale[ 56]=[ 158,   0, 100];heatScale[ 56]=[ 142,  66,   0];rScale[ 56]=[ 56,0,0];gScale[ 56]=[0, 56,0];bScale[ 56]=[0,0, 56];    ocsScale[56]=[120,68,0];    rainbowScale[56]=[25,101,138];  btcScale[56]=[0,100,158];   btyScale[56]=[110,110,204]; lingreyScale[56]=[10,10,10];    locsScale[56]=[69,0,0];
    magentaScale[ 57]=[ 159,   0, 102];heatScale[ 57]=[ 143,  67,   0];rScale[ 57]=[ 57,0,0];gScale[ 57]=[0, 57,0];bScale[ 57]=[0,0, 57];    ocsScale[57]=[120,70,0];    rainbowScale[57]=[25,104,137];  btcScale[57]=[0,102,159];   btyScale[57]=[110,110,204]; lingreyScale[57]=[10,10,10];    locsScale[57]=[71,0,0];
    magentaScale[ 58]=[ 161,   0, 103];heatScale[ 58]=[ 143,  67,   0];rScale[ 58]=[ 58,0,0];gScale[ 58]=[0, 58,0];bScale[ 58]=[0,0, 58];    ocsScale[58]=[120,73,0];    rainbowScale[58]=[25,104,137];  btcScale[58]=[0,103,161];   btyScale[58]=[111,111,204]; lingreyScale[58]=[10,10,10];    locsScale[58]=[74,0,0];
    magentaScale[ 59]=[ 163,   0, 105];heatScale[ 59]=[ 145,  68,   0];rScale[ 59]=[ 59,0,0];gScale[ 59]=[0, 59,0];bScale[ 59]=[0,0, 59];    ocsScale[59]=[120,75,0];    rainbowScale[59]=[25,104,137];  btcScale[59]=[0,105,163];   btyScale[59]=[112,112,203]; lingreyScale[59]=[10,10,10];    locsScale[59]=[76,0,0];
    magentaScale[ 60]=[ 164,   0, 106];heatScale[ 60]=[ 145,  68,   0];rScale[ 60]=[ 60,0,0];gScale[ 60]=[0, 60,0];bScale[ 60]=[0,0, 60];    ocsScale[60]=[120,78,0];    rainbowScale[60]=[26,108,137];  btcScale[60]=[0,106,164];   btyScale[60]=[113,113,203]; lingreyScale[60]=[10,10,10];    locsScale[60]=[80,0,0];
    magentaScale[ 61]=[ 166,   0, 108];heatScale[ 61]=[ 146,  70,   0];rScale[ 61]=[ 61,0,0];gScale[ 61]=[0, 61,0];bScale[ 61]=[0,0, 61];    ocsScale[61]=[120,80,0];    rainbowScale[61]=[26,108,137];  btcScale[61]=[0,108,166];   btyScale[61]=[114,114,202]; lingreyScale[61]=[11,11,11];    locsScale[61]=[81,0,0];
    magentaScale[ 62]=[ 168,   0, 109];heatScale[ 62]=[ 146,  70,   0];rScale[ 62]=[ 62,0,0];gScale[ 62]=[0, 62,0];bScale[ 62]=[0,0, 62];    ocsScale[62]=[120,83,0];    rainbowScale[62]=[27,111,136];  btcScale[62]=[0,109,168];   btyScale[62]=[114,114,202]; lingreyScale[62]=[11,11,11];    locsScale[62]=[84,0,0];
    magentaScale[ 63]=[ 170,   0, 111];heatScale[ 63]=[ 148,  71,   0];rScale[ 63]=[ 63,0,0];gScale[ 63]=[0, 63,0];bScale[ 63]=[0,0, 63];    ocsScale[63]=[120,85,0];    rainbowScale[63]=[27,111,136];  btcScale[63]=[0,111,170];   btyScale[63]=[115,115,202]; lingreyScale[63]=[12,12,12];    locsScale[63]=[86,0,0];
    magentaScale[ 64]=[ 171,   0, 113];heatScale[ 64]=[ 148,  71,   0];rScale[ 64]=[ 64,0,0];gScale[ 64]=[0, 64,0];bScale[ 64]=[0,0, 64];    ocsScale[64]=[120,88,0];    rainbowScale[64]=[27,111,136];  btcScale[64]=[0,113,171];   btyScale[64]=[116,116,201]; lingreyScale[64]=[12,12,12];    locsScale[64]=[89,0,0];
    magentaScale[ 65]=[ 173,   0, 114];heatScale[ 65]=[ 149,  72,   0];rScale[ 65]=[ 65,0,0];gScale[ 65]=[0, 65,0];bScale[ 65]=[0,0, 65];    ocsScale[65]=[120,90,0];    rainbowScale[65]=[27,115,135];  btcScale[65]=[0,114,173];   btyScale[65]=[117,117,201]; lingreyScale[65]=[12,12,12];    locsScale[65]=[92,0,0];
    magentaScale[ 66]=[ 175,   0, 116];heatScale[ 66]=[ 149,  72,   0];rScale[ 66]=[ 66,0,0];gScale[ 66]=[0, 66,0];bScale[ 66]=[0,0, 66];    ocsScale[66]=[120,93,0];    rainbowScale[66]=[27,115,135];  btcScale[66]=[0,116,175];   btyScale[66]=[118,118,200]; lingreyScale[66]=[13,13,13];    locsScale[66]=[94,0,0];
    magentaScale[ 67]=[ 176,   0, 117];heatScale[ 67]=[ 151,  73,   0];rScale[ 67]=[ 67,0,0];gScale[ 67]=[0, 67,0];bScale[ 67]=[0,0, 67];    ocsScale[67]=[120,95,0];    rainbowScale[67]=[28,118,134];  btcScale[67]=[0,117,176];   btyScale[67]=[118,118,200]; lingreyScale[67]=[13,13,13];    locsScale[67]=[97,0,0];
    magentaScale[ 68]=[ 178,   0, 119];heatScale[ 68]=[ 151,  73,   0];rScale[ 68]=[ 68,0,0];gScale[ 68]=[0, 68,0];bScale[ 68]=[0,0, 68];    ocsScale[68]=[120,98,0];    rainbowScale[68]=[28,118,134];  btcScale[68]=[0,119,178];   btyScale[68]=[119,119,200]; lingreyScale[68]=[14,14,14];    locsScale[68]=[100,0,0];
    magentaScale[ 69]=[ 180,   0, 121];heatScale[ 69]=[ 153,  75,   0];rScale[ 69]=[ 69,0,0];gScale[ 69]=[0, 69,0];bScale[ 69]=[0,0, 69];    ocsScale[69]=[120,100,0];   rainbowScale[69]=[29,122,133];  btcScale[69]=[0,121,180];   btyScale[69]=[120,120,199]; lingreyScale[69]=[14,14,14];    locsScale[69]=[103,0,0];
    magentaScale[ 70]=[ 180,   0, 121];heatScale[ 70]=[ 153,  75,   0];rScale[ 70]=[ 70,0,0];gScale[ 70]=[0, 70,0];bScale[ 70]=[0,0, 70];    ocsScale[70]=[120,103,0];   rainbowScale[70]=[29,122,133];  btcScale[70]=[0,121,180];   btyScale[70]=[121,121,199]; lingreyScale[70]=[15,15,15];    locsScale[70]=[106,0,0];
    magentaScale[ 71]=[ 181,   0, 122];heatScale[ 71]=[ 154,  76,   0];rScale[ 71]=[ 71,0,0];gScale[ 71]=[0, 71,0];bScale[ 71]=[0,0, 71];    ocsScale[71]=[120,105,0];   rainbowScale[71]=[29,122,133];  btcScale[71]=[0,122,181];   btyScale[71]=[121,121,199]; lingreyScale[71]=[15,15,15];    locsScale[71]=[109,0,0];
    magentaScale[ 72]=[ 183,   0, 124];heatScale[ 72]=[ 154,  76,   0];rScale[ 72]=[ 72,0,0];gScale[ 72]=[0, 72,0];bScale[ 72]=[0,0, 72];    ocsScale[72]=[120,108,0];   rainbowScale[72]=[29,122,133];  btcScale[72]=[0,124,183];   btyScale[72]=[122,122,198]; lingreyScale[72]=[15,15,15];    locsScale[72]=[112,0,0];
    magentaScale[ 73]=[ 185,   0, 125];heatScale[ 73]=[ 154,  76,   0];rScale[ 73]=[ 73,0,0];gScale[ 73]=[0, 73,0];bScale[ 73]=[0,0, 73];    ocsScale[73]=[120,110,0];   rainbowScale[73]=[29,125,132];  btcScale[73]=[0,125,185];   btyScale[73]=[123,123,198]; lingreyScale[73]=[16,16,16];    locsScale[73]=[115,0,0];
    magentaScale[ 74]=[ 187,   0, 127];heatScale[ 74]=[ 156,  77,   0];rScale[ 74]=[ 74,0,0];gScale[ 74]=[0, 74,0];bScale[ 74]=[0,0, 74];    ocsScale[74]=[120,113,0];   rainbowScale[74]=[29,125,132];  btcScale[74]=[0,127,187];   btyScale[74]=[124,124,198]; lingreyScale[74]=[16,16,16];    locsScale[74]=[117,0,0];
    magentaScale[ 75]=[ 188,   0, 129];heatScale[ 75]=[ 156,  77,   0];rScale[ 75]=[ 75,0,0];gScale[ 75]=[0, 75,0];bScale[ 75]=[0,0, 75];    ocsScale[75]=[120,115,0];   rainbowScale[75]=[30,128,131];  btcScale[75]=[0,129,188];   btyScale[75]=[124,124,197]; lingreyScale[75]=[17,17,17];    locsScale[75]=[122,0,0];
    magentaScale[ 76]=[ 190,   0, 130];heatScale[ 76]=[ 157,  79,   0];rScale[ 76]=[ 76,0,0];gScale[ 76]=[0, 76,0];bScale[ 76]=[0,0, 76];    ocsScale[76]=[120,118,0];   rainbowScale[76]=[30,128,131];  btcScale[76]=[0,130,190];   btyScale[76]=[125,125,197]; lingreyScale[76]=[17,17,17];    locsScale[76]=[126,0,0];
    magentaScale[ 77]=[ 192,   0, 132];heatScale[ 77]=[ 157,  79,   0];rScale[ 77]=[ 77,0,0];gScale[ 77]=[0, 77,0];bScale[ 77]=[0,0, 77];    ocsScale[77]=[120,120,0];   rainbowScale[77]=[31,131,130];  btcScale[77]=[0,132,192];   btyScale[77]=[126,126,197]; lingreyScale[77]=[18,18,18];    locsScale[77]=[128,0,0];
    magentaScale[ 78]=[ 193,   0, 133];heatScale[ 78]=[ 159,  80,   0];rScale[ 78]=[ 78,0,0];gScale[ 78]=[0, 78,0];bScale[ 78]=[0,0, 78];    ocsScale[78]=[120,123,0];   rainbowScale[78]=[31,131,130];  btcScale[78]=[0,133,193];   btyScale[78]=[127,127,196]; lingreyScale[78]=[18,18,18];    locsScale[78]=[131,0,0];
    magentaScale[ 79]=[ 195,   0, 135];heatScale[ 79]=[ 159,  80,   0];rScale[ 79]=[ 79,0,0];gScale[ 79]=[0, 79,0];bScale[ 79]=[0,0, 79];    ocsScale[79]=[120,125,3];   rainbowScale[79]=[31,131,130];  btcScale[79]=[0,135,195];   btyScale[79]=[128,128,196]; lingreyScale[79]=[19,19,19];    locsScale[79]=[135,0,0];
    magentaScale[ 80]=[ 197,   0, 137];heatScale[ 80]=[ 159,  80,   0];rScale[ 80]=[ 80,0,0];gScale[ 80]=[0, 80,0];bScale[ 80]=[0,0, 80];    ocsScale[80]=[120,128,5];   rainbowScale[80]=[32,134,128];  btcScale[80]=[0,137,197];   btyScale[80]=[128,128,195]; lingreyScale[80]=[19,19,19];    locsScale[80]=[135,0,0];
    magentaScale[ 81]=[ 198,   0, 138];heatScale[ 81]=[ 160,  81,   0];rScale[ 81]=[ 81,0,0];gScale[ 81]=[0, 81,0];bScale[ 81]=[0,0, 81];    ocsScale[81]=[120,130,8];   rainbowScale[81]=[32,134,128];  btcScale[81]=[0,138,198];   btyScale[81]=[129,129,195]; lingreyScale[81]=[19,19,19];    locsScale[81]=[135,1,0];
    magentaScale[ 82]=[ 200,   0, 140];heatScale[ 82]=[ 160,  81,   0];rScale[ 82]=[ 82,0,0];gScale[ 82]=[0, 82,0];bScale[ 82]=[0,0, 82];    ocsScale[82]=[120,133,10];  rainbowScale[82]=[33,137,127];  btcScale[82]=[0,140,200];   btyScale[82]=[130,130,195]; lingreyScale[82]=[19,19,19];    locsScale[82]=[135,2,0];
    magentaScale[ 83]=[ 202,   0, 141];heatScale[ 83]=[ 162,  82,   0];rScale[ 83]=[ 83,0,0];gScale[ 83]=[0, 83,0];bScale[ 83]=[0,0, 83];    ocsScale[83]=[120,135,13];  rainbowScale[83]=[33,137,127];  btcScale[83]=[0,141,202];   btyScale[83]=[130,130,194]; lingreyScale[83]=[19,19,19];    locsScale[83]=[135,3,0];
    magentaScale[ 84]=[ 204,   0, 143];heatScale[ 84]=[ 162,  82,   0];rScale[ 84]=[ 84,0,0];gScale[ 84]=[0, 84,0];bScale[ 84]=[0,0, 84];    ocsScale[84]=[120,138,15];  rainbowScale[84]=[33,137,127];  btcScale[84]=[0,143,204];   btyScale[84]=[131,131,194]; lingreyScale[84]=[20,20,20];    locsScale[84]=[135,4,0];
    magentaScale[ 85]=[ 204,   0, 143];heatScale[ 85]=[ 163,  84,   0];rScale[ 85]=[ 85,0,0];gScale[ 85]=[0, 85,0];bScale[ 85]=[0,0, 85];    ocsScale[85]=[120,140,18];  rainbowScale[85]=[34,140,125];  btcScale[85]=[0,143,204];   btyScale[85]=[132,132,194]; lingreyScale[85]=[20,20,20];    locsScale[85]=[135,6,0];
    magentaScale[ 86]=[ 205,   0, 145];heatScale[ 86]=[ 163,  84,   0];rScale[ 86]=[ 86,0,0];gScale[ 86]=[0, 86,0];bScale[ 86]=[0,0, 86];    ocsScale[86]=[120,143,20];  rainbowScale[86]=[34,140,125];  btcScale[86]=[0,145,205];   btyScale[86]=[133,133,193]; lingreyScale[86]=[22,22,22];    locsScale[86]=[135,6,0];
    magentaScale[ 87]=[ 207,   0, 146];heatScale[ 87]=[ 165,  85,   0];rScale[ 87]=[ 87,0,0];gScale[ 87]=[0, 87,0];bScale[ 87]=[0,0, 87];    ocsScale[87]=[120,145,23];  rainbowScale[87]=[35,142,123];  btcScale[87]=[0,146,207];   btyScale[87]=[133,133,193]; lingreyScale[87]=[22,22,22];    locsScale[87]=[135,8,0];
    magentaScale[ 88]=[ 209,   0, 148];heatScale[ 88]=[ 165,  85,   0];rScale[ 88]=[ 88,0,0];gScale[ 88]=[0, 88,0];bScale[ 88]=[0,0, 88];    ocsScale[88]=[121,148,25];  rainbowScale[88]=[35,142,123];  btcScale[88]=[0,148,209];   btyScale[88]=[134,134,193]; lingreyScale[88]=[22,22,22];    locsScale[88]=[135,9,0];
    magentaScale[ 89]=[ 210,   0, 149];heatScale[ 89]=[ 166,  86,   0];rScale[ 89]=[ 89,0,0];gScale[ 89]=[0, 89,0];bScale[ 89]=[0,0, 89];    ocsScale[89]=[122,150,28];  rainbowScale[89]=[36,145,121];  btcScale[89]=[0,149,210];   btyScale[89]=[135,135,192]; lingreyScale[89]=[23,23,23];    locsScale[89]=[135,10,0];
    magentaScale[ 90]=[ 212,   0, 151];heatScale[ 90]=[ 166,  86,   0];rScale[ 90]=[ 90,0,0];gScale[ 90]=[0, 90,0];bScale[ 90]=[0,0, 90];    ocsScale[90]=[123,153,30];  rainbowScale[90]=[36,145,121];  btcScale[90]=[0,151,212];   btyScale[90]=[136,136,192]; lingreyScale[90]=[23,23,23];    locsScale[90]=[135,11,0];
    magentaScale[ 91]=[ 214,   0, 153];heatScale[ 91]=[ 166,  86,   0];rScale[ 91]=[ 91,0,0];gScale[ 91]=[0, 91,0];bScale[ 91]=[0,0, 91];    ocsScale[91]=[124,155,33];  rainbowScale[91]=[36,145,121];  btcScale[91]=[0,153,214];   btyScale[91]=[136,136,192]; lingreyScale[91]=[24,24,24];    locsScale[91]=[135,13,0];
    magentaScale[ 92]=[ 215,   0, 154];heatScale[ 92]=[ 168,  87,   0];rScale[ 92]=[ 92,0,0];gScale[ 92]=[0, 92,0];bScale[ 92]=[0,0, 92];    ocsScale[92]=[125,158,35];  rainbowScale[92]=[37,147,118];  btcScale[92]=[0,154,215];   btyScale[92]=[137,137,191]; lingreyScale[92]=[24,24,24];    locsScale[92]=[135,13,0];
    magentaScale[ 93]=[ 217,   0, 156];heatScale[ 93]=[ 168,  87,   0];rScale[ 93]=[ 93,0,0];gScale[ 93]=[0, 93,0];bScale[ 93]=[0,0, 93];    ocsScale[93]=[126,160,38];  rainbowScale[93]=[37,147,118];  btcScale[93]=[0,156,217];   btyScale[93]=[138,138,191]; lingreyScale[93]=[26,26,26];    locsScale[93]=[135,15,0];
    magentaScale[ 94]=[ 219,   0, 157];heatScale[ 94]=[ 170,  89,   0];rScale[ 94]=[ 94,0,0];gScale[ 94]=[0, 94,0];bScale[ 94]=[0,0, 94];    ocsScale[94]=[127,163,40];  rainbowScale[94]=[38,150,116];  btcScale[94]=[0,157,219];   btyScale[94]=[139,139,191]; lingreyScale[94]=[26,26,26];    locsScale[94]=[135,17,0];
    magentaScale[ 95]=[ 221,   0, 159];heatScale[ 95]=[ 170,  89,   0];rScale[ 95]=[ 95,0,0];gScale[ 95]=[0, 95,0];bScale[ 95]=[0,0, 95];    ocsScale[95]=[128,165,43];  rainbowScale[95]=[38,150,116];  btcScale[95]=[0,159,221];   btyScale[95]=[139,139,190]; lingreyScale[95]=[26,26,26];    locsScale[95]=[135,17,0];
    magentaScale[ 96]=[ 222,   0, 160];heatScale[ 96]=[ 171,  90,   0];rScale[ 96]=[ 96,0,0];gScale[ 96]=[0, 96,0];bScale[ 96]=[0,0, 96];    ocsScale[96]=[129,168,45];  rainbowScale[96]=[40,152,113];  btcScale[96]=[0,160,222];   btyScale[96]=[140,140,190]; lingreyScale[96]=[27,27,27];    locsScale[96]=[135,19,0];
    magentaScale[ 97]=[ 222,   0, 160];heatScale[ 97]=[ 171,  90,   0];rScale[ 97]=[ 97,0,0];gScale[ 97]=[0, 97,0];bScale[ 97]=[0,0, 97];    ocsScale[97]=[130,170,48];  rainbowScale[97]=[40,152,113];  btcScale[97]=[0,160,222];   btyScale[97]=[141,141,190]; lingreyScale[97]=[27,27,27];    locsScale[97]=[135,21,0];
    magentaScale[ 98]=[ 224,   0, 162];heatScale[ 98]=[ 173,  91,   0];rScale[ 98]=[ 98,0,0];gScale[ 98]=[0, 98,0];bScale[ 98]=[0,0, 98];    ocsScale[98]=[131,173,50];  rainbowScale[98]=[41,154,111];  btcScale[98]=[0,162,224];   btyScale[98]=[142,142,189]; lingreyScale[98]=[29,29,29];    locsScale[98]=[135,22,0];
    magentaScale[ 99]=[ 226,   0, 164];heatScale[ 99]=[ 173,  91,   0];rScale[ 99]=[ 99,0,0];gScale[ 99]=[0, 99,0];bScale[ 99]=[0,0, 99];    ocsScale[99]=[132,175,53];  rainbowScale[99]=[41,154,111];  btcScale[99]=[0,164,226];   btyScale[99]=[142,142,189]; lingreyScale[99]=[29,29,29];    locsScale[99]=[135,23,0];
    magentaScale[100]=[ 227,   0, 165];heatScale[100]=[ 174,  93,   0];rScale[100]=[100,0,0];gScale[100]=[0,100,0];bScale[100]=[0,0,100];    ocsScale[100]=[132,178,55]; rainbowScale[100]=[42,156,108]; btcScale[100]=[0,165,227];  btyScale[100]=[143,143,189];lingreyScale[100]=[30,30,30];   locsScale[100]=[135,25,0];
    magentaScale[101]=[ 229,   0, 167];heatScale[101]=[ 174,  93,   0];rScale[101]=[101,0,0];gScale[101]=[0,101,0];bScale[101]=[0,0,101];    ocsScale[101]=[132,180,58]; rainbowScale[101]=[42,156,108]; btcScale[101]=[0,167,229];  btyScale[101]=[144,144,188];lingreyScale[101]=[30,30,30];   locsScale[101]=[135,26,0];
    magentaScale[102]=[ 231,   0, 168];heatScale[102]=[ 176,  94,   0];rScale[102]=[102,0,0];gScale[102]=[0,102,0];bScale[102]=[0,0,102];    ocsScale[102]=[132,183,60]; rainbowScale[102]=[43,158,106]; btcScale[102]=[0,168,231];  btyScale[102]=[144,144,188];lingreyScale[102]=[32,32,32];   locsScale[102]=[135,27,0];
    magentaScale[103]=[ 232,   0, 170];heatScale[103]=[ 176,  94,   0];rScale[103]=[103,0,0];gScale[103]=[0,103,0];bScale[103]=[0,0,103];    ocsScale[103]=[132,185,63]; rainbowScale[103]=[43,158,106]; btcScale[103]=[0,170,232];  btyScale[103]=[145,145,188];lingreyScale[103]=[32,32,32];   locsScale[103]=[135,29,0];
    magentaScale[104]=[ 234,   0, 172];heatScale[104]=[ 177,  95,   0];rScale[104]=[104,0,0];gScale[104]=[0,104,0];bScale[104]=[0,0,104];    ocsScale[104]=[132,188,65]; rainbowScale[104]=[43,158,106]; btcScale[104]=[0,172,234];  btyScale[104]=[146,146,187];lingreyScale[104]=[32,32,32];   locsScale[104]=[135,31,0];
    magentaScale[105]=[ 236,   0, 173];heatScale[105]=[ 177,  95,   0];rScale[105]=[105,0,0];gScale[105]=[0,105,0];bScale[105]=[0,0,105];    ocsScale[105]=[132,190,68]; rainbowScale[105]=[45,160,104]; btcScale[105]=[0,173,236];  btyScale[105]=[147,147,187];lingreyScale[105]=[32,32,32];   locsScale[105]=[135,32,0];
    magentaScale[106]=[ 238,   0, 175];heatScale[106]=[ 179,  96,   0];rScale[106]=[106,0,0];gScale[106]=[0,106,0];bScale[106]=[0,0,106];    ocsScale[106]=[132,193,70]; rainbowScale[106]=[45,160,104]; btcScale[106]=[0,175,238];  btyScale[106]=[147,147,187];lingreyScale[106]=[32,32,32];   locsScale[106]=[135,33,0];
    magentaScale[107]=[ 238,   0, 175];heatScale[107]=[ 179,  96,   0];rScale[107]=[107,0,0];gScale[107]=[0,107,0];bScale[107]=[0,0,107];    ocsScale[107]=[132,195,73]; rainbowScale[107]=[46,162,101]; btcScale[107]=[0,175,238];  btyScale[107]=[148,148,186];lingreyScale[107]=[34,34,34];   locsScale[107]=[135,35,0];
    magentaScale[108]=[ 239,   0, 176];heatScale[108]=[ 180,  98,   0];rScale[108]=[108,0,0];gScale[108]=[0,108,0];bScale[108]=[0,0,108];    ocsScale[108]=[132,198,75]; rainbowScale[108]=[46,162,101]; btcScale[108]=[0,176,239];  btyScale[108]=[149,149,186];lingreyScale[108]=[34,34,34];   locsScale[108]=[135,36,0];
    magentaScale[109]=[ 241,   0, 178];heatScale[109]=[ 182,  99,   0];rScale[109]=[109,0,0];gScale[109]=[0,109,0];bScale[109]=[0,0,109];    ocsScale[109]=[132,200,78]; rainbowScale[109]=[48,164,99];  btcScale[109]=[0,178,241];  btyScale[109]=[149,149,186];lingreyScale[109]=[35,35,35];   locsScale[109]=[135,38,0];
    magentaScale[110]=[ 243,   0, 180];heatScale[110]=[ 182,  99,   0];rScale[110]=[110,0,0];gScale[110]=[0,110,0];bScale[110]=[0,0,110];    ocsScale[110]=[132,203,80]; rainbowScale[110]=[48,164,99];  btcScale[110]=[0,180,243];  btyScale[110]=[150,150,185];lingreyScale[110]=[35,35,35];   locsScale[110]=[135,40,0];
    magentaScale[111]=[ 244,   0, 181];heatScale[111]=[ 183, 100,   0];rScale[111]=[111,0,0];gScale[111]=[0,111,0];bScale[111]=[0,0,111];    ocsScale[111]=[132,205,83]; rainbowScale[111]=[50,166,97];  btcScale[111]=[0,181,244];  btyScale[111]=[151,151,185];lingreyScale[111]=[35,35,35];   locsScale[111]=[135,42,0];
    magentaScale[112]=[ 246,   0, 183];heatScale[112]=[ 183, 100,   0];rScale[112]=[112,0,0];gScale[112]=[0,112,0];bScale[112]=[0,0,112];    ocsScale[112]=[132,208,85]; rainbowScale[112]=[50,166,97];  btcScale[112]=[0,183,246];  btyScale[112]=[152,152,185];lingreyScale[112]=[37,37,37];   locsScale[112]=[135,44,0];
    magentaScale[113]=[ 248,   2, 184];heatScale[113]=[ 185, 102,   0];rScale[113]=[113,0,0];gScale[113]=[0,113,0];bScale[113]=[0,0,113];    ocsScale[113]=[132,210,88]; rainbowScale[113]=[51,168,95];  btcScale[113]=[2,184,248];  btyScale[113]=[152,152,184];lingreyScale[113]=[37,37,37];   locsScale[113]=[135,46,0];
    magentaScale[114]=[ 249,   4, 186];heatScale[114]=[ 185, 102,   0];rScale[114]=[114,0,0];gScale[114]=[0,114,0];bScale[114]=[0,0,114];    ocsScale[114]=[132,213,90]; rainbowScale[114]=[53,170,93];  btcScale[114]=[4,186,249];  btyScale[114]=[153,153,184];lingreyScale[114]=[39,39,39];   locsScale[114]=[135,47,0];
    magentaScale[115]=[ 249,   4, 186];heatScale[115]=[ 187, 103,   0];rScale[115]=[115,0,0];gScale[115]=[0,115,0];bScale[115]=[0,0,115];    ocsScale[115]=[132,215,93]; rainbowScale[115]=[53,170,93];  btcScale[115]=[4,186,249];  btyScale[115]=[154,154,184];lingreyScale[115]=[39,39,39];   locsScale[115]=[135,49,0];
    magentaScale[116]=[ 249,   4, 186];heatScale[116]=[ 187, 103,   0];rScale[116]=[116,0,0];gScale[116]=[0,116,0];bScale[116]=[0,0,116];    ocsScale[116]=[132,218,95]; rainbowScale[116]=[53,170,93];  btcScale[116]=[4,186,249];  btyScale[116]=[154,154,183];lingreyScale[116]=[41,41,41];   locsScale[116]=[135,51,0];
    magentaScale[117]=[ 251,   6, 188];heatScale[117]=[ 188, 104,   0];rScale[117]=[117,0,0];gScale[117]=[0,117,0];bScale[117]=[0,0,117];    ocsScale[117]=[132,220,98]; rainbowScale[117]=[55,172,91];  btcScale[117]=[6,188,251];  btyScale[117]=[155,155,183];lingreyScale[117]=[41,41,41];   locsScale[117]=[135,52,0];
    magentaScale[118]=[ 251,   6, 188];heatScale[118]=[ 188, 104,   0];rScale[118]=[118,0,0];gScale[118]=[0,118,0];bScale[118]=[0,0,118];    ocsScale[118]=[132,223,100];rainbowScale[118]=[55,172,91];  btcScale[118]=[6,188,251];  btyScale[118]=[156,156,182];lingreyScale[118]=[41,41,41];   locsScale[118]=[135,54,0];
    magentaScale[119]=[ 253,   9, 189];heatScale[119]=[ 190, 105,   0];rScale[119]=[119,0,0];gScale[119]=[0,119,0];bScale[119]=[0,0,119];    ocsScale[119]=[132,225,103];rainbowScale[119]=[57,174,88];  btcScale[119]=[9,189,253];  btyScale[119]=[157,157,182];lingreyScale[119]=[43,43,43];   locsScale[119]=[135,56,0];
    magentaScale[120]=[ 253,   9, 189];heatScale[120]=[ 191, 107,   0];rScale[120]=[120,0,0];gScale[120]=[0,120,0];bScale[120]=[0,0,120];    ocsScale[120]=[132,228,105];rainbowScale[120]=[57,174,88];  btcScale[120]=[9,189,253];  btyScale[120]=[157,157,182];lingreyScale[120]=[43,43,43];   locsScale[120]=[135,57,0];
    magentaScale[121]=[ 255,  11, 191];heatScale[121]=[ 191, 107,   0];rScale[121]=[121,0,0];gScale[121]=[0,121,0];bScale[121]=[0,0,121];    ocsScale[121]=[132,230,108];rainbowScale[121]=[59,175,86];  btcScale[121]=[11,191,255]; btyScale[121]=[158,158,181];lingreyScale[121]=[45,45,45];   locsScale[121]=[135,59,0];
    magentaScale[122]=[ 255,  11, 191];heatScale[122]=[ 193, 108,   0];rScale[122]=[122,0,0];gScale[122]=[0,122,0];bScale[122]=[0,0,122];    ocsScale[122]=[132,233,110];rainbowScale[122]=[62,177,84];  btcScale[122]=[11,191,255]; btyScale[122]=[159,159,181];lingreyScale[122]=[45,45,45];   locsScale[122]=[135,62,0];
    magentaScale[123]=[ 255,  13, 192];heatScale[123]=[ 193, 108,   0];rScale[123]=[123,0,0];gScale[123]=[0,123,0];bScale[123]=[0,0,123];    ocsScale[123]=[132,235,113];rainbowScale[123]=[64,178,82];  btcScale[123]=[13,192,255]; btyScale[123]=[159,159,181];lingreyScale[123]=[46,46,46];   locsScale[123]=[135,63,0];
    magentaScale[124]=[ 255,  13, 192];heatScale[124]=[ 194, 109,   0];rScale[124]=[124,0,0];gScale[124]=[0,124,0];bScale[124]=[0,0,124];    ocsScale[124]=[132,238,115];rainbowScale[124]=[64,178,82];  btcScale[124]=[13,192,255]; btyScale[124]=[160,160,180];lingreyScale[124]=[46,46,46];   locsScale[124]=[135,65,0];
    magentaScale[125]=[ 255,  13, 192];heatScale[125]=[ 196, 110,   0];rScale[125]=[125,0,0];gScale[125]=[0,125,0];bScale[125]=[0,0,125];    ocsScale[125]=[132,240,118];rainbowScale[125]=[67,180,80];  btcScale[125]=[13,192,255]; btyScale[125]=[161,161,180];lingreyScale[125]=[46,46,46];   locsScale[125]=[135,67,0];
    magentaScale[126]=[ 255,  16, 194];heatScale[126]=[ 196, 110,   0];rScale[126]=[126,0,0];gScale[126]=[0,126,0];bScale[126]=[0,0,126];    ocsScale[126]=[132,243,120];rainbowScale[126]=[67,180,80];  btcScale[126]=[16,194,255]; btyScale[126]=[162,162,180];lingreyScale[126]=[47,47,47];   locsScale[126]=[135,69,0];
    magentaScale[127]=[ 255,  18, 196];heatScale[127]=[ 197, 112,   0];rScale[127]=[127,0,0];gScale[127]=[0,127,0];bScale[127]=[0,0,127];    ocsScale[127]=[132,245,123];rainbowScale[127]=[69,181,79];  btcScale[127]=[18,196,255]; btyScale[127]=[162,162,179];lingreyScale[127]=[47,47,47];   locsScale[127]=[135,72,0];
    magentaScale[128]=[ 255,  20, 197];heatScale[128]=[ 197, 112,   0];rScale[128]=[128,0,0];gScale[128]=[0,128,0];bScale[128]=[0,0,128];    ocsScale[128]=[132,248,125];rainbowScale[128]=[72,183,77];  btcScale[128]=[20,197,255]; btyScale[128]=[163,163,179];lingreyScale[128]=[49,49,49];   locsScale[128]=[135,73,0];
    magentaScale[129]=[ 255,  20, 197];heatScale[129]=[ 199, 113,   0];rScale[129]=[129,0,0];gScale[129]=[0,129,0];bScale[129]=[0,0,129];    ocsScale[129]=[132,250,128];rainbowScale[129]=[72,183,77];  btcScale[129]=[20,197,255]; btyScale[129]=[164,164,178];lingreyScale[129]=[49,49,49];   locsScale[129]=[135,76,0];
    magentaScale[130]=[ 255,  23, 199];heatScale[130]=[ 200, 114,   0];rScale[130]=[130,0,0];gScale[130]=[0,130,0];bScale[130]=[0,0,130];    ocsScale[130]=[132,253,130];rainbowScale[130]=[72,183,77];  btcScale[130]=[23,199,255]; btyScale[130]=[164,164,178];lingreyScale[130]=[51,51,51];   locsScale[130]=[135,78,0];
    magentaScale[131]=[ 255,  25, 200];heatScale[131]=[ 200, 114,   0];rScale[131]=[131,0,0];gScale[131]=[0,131,0];bScale[131]=[0,0,131];    ocsScale[131]=[132,255,133];rainbowScale[131]=[75,184,76];  btcScale[131]=[25,200,255]; btyScale[131]=[165,165,178];lingreyScale[131]=[51,51,51];   locsScale[131]=[135,80,0];
    magentaScale[132]=[ 255,  27, 202];heatScale[132]=[ 202, 116,   0];rScale[132]=[132,0,0];gScale[132]=[0,132,0];bScale[132]=[0,0,132];    ocsScale[132]=[132,255,135];rainbowScale[132]=[77,186,74];  btcScale[132]=[27,202,255]; btyScale[132]=[166,166,177];lingreyScale[132]=[52,52,52];   locsScale[132]=[135,82,0];
    magentaScale[133]=[ 255,  30, 204];heatScale[133]=[ 202, 116,   0];rScale[133]=[133,0,0];gScale[133]=[0,133,0];bScale[133]=[0,0,133];    ocsScale[133]=[132,255,138];rainbowScale[133]=[80,187,73];  btcScale[133]=[30,204,255]; btyScale[133]=[167,167,177];lingreyScale[133]=[52,52,52];   locsScale[133]=[135,84,0];
    magentaScale[134]=[ 255,  32, 205];heatScale[134]=[ 204, 117,   0];rScale[134]=[134,0,0];gScale[134]=[0,134,0];bScale[134]=[0,0,134];    ocsScale[134]=[132,255,140];rainbowScale[134]=[83,189,72];  btcScale[134]=[32,205,255]; btyScale[134]=[167,167,176];lingreyScale[134]=[52,52,52];   locsScale[134]=[135,87,0];
    magentaScale[135]=[ 255,  34, 207];heatScale[135]=[ 205, 118,   0];rScale[135]=[135,0,0];gScale[135]=[0,135,0];bScale[135]=[0,0,135];    ocsScale[135]=[132,255,143];rainbowScale[135]=[87,190,72];  btcScale[135]=[34,207,255]; btyScale[135]=[168,168,176];lingreyScale[135]=[54,54,54];   locsScale[135]=[135,88,0];
    magentaScale[136]=[ 255,  37, 208];heatScale[136]=[ 205, 118,   0];rScale[136]=[136,0,0];gScale[136]=[0,136,0];bScale[136]=[0,0,136];    ocsScale[136]=[132,255,145];rainbowScale[136]=[91,191,71];  btcScale[136]=[37,208,255]; btyScale[136]=[169,169,176];lingreyScale[136]=[54,54,54];   locsScale[136]=[135,90,0];
    magentaScale[137]=[ 255,  37, 208];heatScale[137]=[ 207, 119,   0];rScale[137]=[137,0,0];gScale[137]=[0,137,0];bScale[137]=[0,0,137];    ocsScale[137]=[132,255,148];rainbowScale[137]=[95,192,70];  btcScale[137]=[37,208,255]; btyScale[137]=[169,169,175];lingreyScale[137]=[56,56,56];   locsScale[137]=[135,93,0];
    magentaScale[138]=[ 255,  39, 210];heatScale[138]=[ 208, 121,   0];rScale[138]=[138,0,0];gScale[138]=[0,138,0];bScale[138]=[0,0,138];    ocsScale[138]=[132,255,150];rainbowScale[138]=[99,193,70];  btcScale[138]=[39,210,255]; btyScale[138]=[170,170,175];lingreyScale[138]=[56,56,56];   locsScale[138]=[135,95,0];
    magentaScale[139]=[ 255,  41, 211];heatScale[139]=[ 208, 121,   0];rScale[139]=[139,0,0];gScale[139]=[0,139,0];bScale[139]=[0,0,139];    ocsScale[139]=[132,255,153];rainbowScale[139]=[103,194,70]; btcScale[139]=[41,211,255]; btyScale[139]=[171,171,174];lingreyScale[139]=[59,59,59];   locsScale[139]=[135,98,0];
    magentaScale[140]=[ 255,  44, 213];heatScale[140]=[ 210, 122,   0];rScale[140]=[140,0,0];gScale[140]=[0,140,0];bScale[140]=[0,0,140];    ocsScale[140]=[132,255,155];rainbowScale[140]=[107,195,70]; btcScale[140]=[44,213,255]; btyScale[140]=[172,172,174];lingreyScale[140]=[59,59,59];   locsScale[140]=[135,101,0];
    magentaScale[141]=[ 255,  46, 215];heatScale[141]=[ 211, 123,   0];rScale[141]=[141,0,0];gScale[141]=[0,141,0];bScale[141]=[0,0,141];    ocsScale[141]=[132,255,158];rainbowScale[141]=[111,196,70]; btcScale[141]=[46,215,255]; btyScale[141]=[172,172,173];lingreyScale[141]=[59,59,59];   locsScale[141]=[135,103,0];
    magentaScale[142]=[ 255,  48, 216];heatScale[142]=[ 211, 123,   0];rScale[142]=[142,0,0];gScale[142]=[0,142,0];bScale[142]=[0,0,142];    ocsScale[142]=[132,255,160];rainbowScale[142]=[111,196,70]; btcScale[142]=[48,216,255]; btyScale[142]=[173,173,173];lingreyScale[142]=[61,61,61];   locsScale[142]=[135,106,0];
    magentaScale[143]=[ 255,  51, 218];heatScale[143]=[ 213, 124,   0];rScale[143]=[143,0,0];gScale[143]=[0,143,0];bScale[143]=[0,0,143];    ocsScale[143]=[132,255,163];rainbowScale[143]=[115,196,70]; btcScale[143]=[51,218,255]; btyScale[143]=[174,174,173];lingreyScale[143]=[61,61,61];   locsScale[143]=[135,107,0];
    magentaScale[144]=[ 255,  53, 219];heatScale[144]=[ 214, 126,   0];rScale[144]=[144,0,0];gScale[144]=[0,144,0];bScale[144]=[0,0,144];    ocsScale[144]=[132,255,165];rainbowScale[144]=[119,197,70]; btcScale[144]=[53,219,255]; btyScale[144]=[174,174,172];lingreyScale[144]=[64,64,64];   locsScale[144]=[135,110,0];
    magentaScale[145]=[ 255,  53, 219];heatScale[145]=[ 214, 126,   0];rScale[145]=[145,0,0];gScale[145]=[0,145,0];bScale[145]=[0,0,145];    ocsScale[145]=[132,255,168];rainbowScale[145]=[123,197,70]; btcScale[145]=[53,219,255]; btyScale[145]=[175,175,172];lingreyScale[145]=[64,64,64];   locsScale[145]=[135,113,0];
    magentaScale[146]=[ 255,  55, 221];heatScale[146]=[ 216, 127,   0];rScale[146]=[146,0,0];gScale[146]=[0,146,0];bScale[146]=[0,0,146];    ocsScale[146]=[132,255,170];rainbowScale[146]=[130,198,71]; btcScale[146]=[55,221,255]; btyScale[146]=[176,176,171];lingreyScale[146]=[67,67,67];   locsScale[146]=[135,115,0];
    magentaScale[147]=[ 255,  57, 223];heatScale[147]=[ 217, 128,   0];rScale[147]=[147,0,0];gScale[147]=[0,147,0];bScale[147]=[0,0,147];    ocsScale[147]=[132,255,173];rainbowScale[147]=[133,199,71]; btcScale[147]=[57,223,255]; btyScale[147]=[177,177,171];lingreyScale[147]=[67,67,67];   locsScale[147]=[135,118,0];
    magentaScale[148]=[ 255,  60, 224];heatScale[148]=[ 217, 128,   0];rScale[148]=[148,0,0];gScale[148]=[0,148,0];bScale[148]=[0,0,148];    ocsScale[148]=[132,255,175];rainbowScale[148]=[137,199,72]; btcScale[148]=[60,224,255]; btyScale[148]=[177,177,170];lingreyScale[148]=[67,67,67];   locsScale[148]=[135,121,0];
    magentaScale[149]=[ 255,  62, 226];heatScale[149]=[ 219, 130,   0];rScale[149]=[149,0,0];gScale[149]=[0,149,0];bScale[149]=[0,0,149];    ocsScale[149]=[132,255,178];rainbowScale[149]=[140,199,72]; btcScale[149]=[62,226,255]; btyScale[149]=[178,178,170];lingreyScale[149]=[69,69,69];   locsScale[149]=[135,124,0];
    magentaScale[150]=[ 255,  64, 227];heatScale[150]=[ 221, 131,   0];rScale[150]=[150,0,0];gScale[150]=[0,150,0];bScale[150]=[0,0,150];    ocsScale[150]=[132,255,180];rainbowScale[150]=[143,199,73]; btcScale[150]=[64,227,255]; btyScale[150]=[179,179,169];lingreyScale[150]=[69,69,69];   locsScale[150]=[135,127,0];
    magentaScale[151]=[ 255,  67, 229];heatScale[151]=[ 221, 131,   0];rScale[151]=[151,0,0];gScale[151]=[0,151,0];bScale[151]=[0,0,151];    ocsScale[151]=[132,255,183];rainbowScale[151]=[143,199,73]; btcScale[151]=[67,229,255]; btyScale[151]=[179,179,169];lingreyScale[151]=[72,72,72];   locsScale[151]=[135,129,0];
    magentaScale[152]=[ 255,  67, 229];heatScale[152]=[ 222, 132,   0];rScale[152]=[152,0,0];gScale[152]=[0,152,0];bScale[152]=[0,0,152];    ocsScale[152]=[132,255,185];rainbowScale[152]=[147,199,73]; btcScale[152]=[67,229,255]; btyScale[152]=[180,180,168];lingreyScale[152]=[72,72,72];   locsScale[152]=[135,133,0];
    magentaScale[153]=[ 255,  69, 231];heatScale[153]=[ 224, 133,   0];rScale[153]=[153,0,0];gScale[153]=[0,153,0];bScale[153]=[0,0,153];    ocsScale[153]=[132,255,188];rainbowScale[153]=[150,199,74]; btcScale[153]=[69,231,255]; btyScale[153]=[181,181,168];lingreyScale[153]=[75,75,75];   locsScale[153]=[135,135,0];
    magentaScale[154]=[ 255,  71, 232];heatScale[154]=[ 224, 133,   0];rScale[154]=[154,0,0];gScale[154]=[0,154,0];bScale[154]=[0,0,154];    ocsScale[154]=[132,255,190];rainbowScale[154]=[153,199,74]; btcScale[154]=[71,232,255]; btyScale[154]=[181,181,167];lingreyScale[154]=[75,75,75];   locsScale[154]=[135,138,0];
    magentaScale[155]=[ 255,  74, 234];heatScale[155]=[ 225, 135,   0];rScale[155]=[155,0,0];gScale[155]=[0,155,0];bScale[155]=[0,0,155];    ocsScale[155]=[132,255,193];rainbowScale[155]=[156,199,75]; btcScale[155]=[74,234,255]; btyScale[155]=[182,182,167];lingreyScale[155]=[76,76,76];   locsScale[155]=[135,141,0];
    magentaScale[156]=[ 255,  76, 235];heatScale[156]=[ 227, 136,   0];rScale[156]=[156,0,0];gScale[156]=[0,156,0];bScale[156]=[0,0,156];    ocsScale[156]=[132,255,195];rainbowScale[156]=[160,200,76]; btcScale[156]=[76,235,255]; btyScale[156]=[183,183,166];lingreyScale[156]=[76,76,76];   locsScale[156]=[135,144,0];
    magentaScale[157]=[ 255,  78, 237];heatScale[157]=[ 227, 136,   0];rScale[157]=[157,0,0];gScale[157]=[0,157,0];bScale[157]=[0,0,157];    ocsScale[157]=[132,255,198];rainbowScale[157]=[167,200,78]; btcScale[157]=[78,237,255]; btyScale[157]=[184,184,166];lingreyScale[157]=[76,76,76];   locsScale[157]=[135,148,0];
    magentaScale[158]=[ 255,  81, 239];heatScale[158]=[ 228, 137,   0];rScale[158]=[158,0,0];gScale[158]=[0,158,0];bScale[158]=[0,0,158];    ocsScale[158]=[132,255,200];rainbowScale[158]=[170,200,79]; btcScale[158]=[81,239,255]; btyScale[158]=[184,184,165];lingreyScale[158]=[78,78,78];   locsScale[158]=[135,150,0];
    magentaScale[159]=[ 255,  81, 239];heatScale[159]=[ 230, 138,   0];rScale[159]=[159,0,0];gScale[159]=[0,159,0];bScale[159]=[0,0,159];    ocsScale[159]=[132,255,203];rainbowScale[159]=[173,200,79]; btcScale[159]=[81,239,255]; btyScale[159]=[185,185,165];lingreyScale[159]=[78,78,78];   locsScale[159]=[135,155,0];
    magentaScale[160]=[ 255,  83, 240];heatScale[160]=[ 230, 138,   0];rScale[160]=[160,0,0];gScale[160]=[0,160,0];bScale[160]=[0,0,160];    ocsScale[160]=[132,255,205];rainbowScale[160]=[173,200,79]; btcScale[160]=[83,240,255]; btyScale[160]=[186,186,164];lingreyScale[160]=[81,81,81];   locsScale[160]=[135,157,0];
    magentaScale[161]=[ 255,  85, 242];heatScale[161]=[ 231, 140,   0];rScale[161]=[161,0,0];gScale[161]=[0,161,0];bScale[161]=[0,0,161];    ocsScale[161]=[132,255,208];rainbowScale[161]=[177,200,80]; btcScale[161]=[85,242,255]; btyScale[161]=[186,186,164];lingreyScale[161]=[81,81,81];   locsScale[161]=[135,160,0];
    magentaScale[162]=[ 255,  88, 243];heatScale[162]=[ 233, 141,   0];rScale[162]=[162,0,0];gScale[162]=[0,162,0];bScale[162]=[0,0,162];    ocsScale[162]=[132,255,210];rainbowScale[162]=[180,200,81]; btcScale[162]=[88,243,255]; btyScale[162]=[187,187,163];lingreyScale[162]=[84,84,84];   locsScale[162]=[135,163,0];
    magentaScale[163]=[ 255,  90, 245];heatScale[163]=[ 233, 141,   0];rScale[163]=[163,0,0];gScale[163]=[0,163,0];bScale[163]=[0,0,163];    ocsScale[163]=[132,255,213];rainbowScale[163]=[183,199,82]; btcScale[163]=[90,245,255]; btyScale[163]=[188,188,163];lingreyScale[163]=[84,84,84];   locsScale[163]=[135,166,0];
    magentaScale[164]=[ 255,  92, 247];heatScale[164]=[ 234, 142,   0];rScale[164]=[164,0,0];gScale[164]=[0,164,0];bScale[164]=[0,0,164];    ocsScale[164]=[132,255,215];rainbowScale[164]=[186,199,82]; btcScale[164]=[92,247,255]; btyScale[164]=[189,189,162];lingreyScale[164]=[84,84,84];   locsScale[164]=[135,170,0];
    magentaScale[165]=[ 255,  95, 248];heatScale[165]=[ 236, 144,   0];rScale[165]=[165,0,0];gScale[165]=[0,165,0];bScale[165]=[0,0,165];    ocsScale[165]=[132,255,218];rainbowScale[165]=[190,199,83]; btcScale[165]=[95,248,255]; btyScale[165]=[189,189,162];lingreyScale[165]=[87,87,87];   locsScale[165]=[135,174,0];
    magentaScale[166]=[ 255,  95, 248];heatScale[166]=[ 236, 144,   0];rScale[166]=[166,0,0];gScale[166]=[0,166,0];bScale[166]=[0,0,166];    ocsScale[166]=[132,255,220];rainbowScale[166]=[196,199,85]; btcScale[166]=[95,248,255]; btyScale[166]=[190,190,161];lingreyScale[166]=[87,87,87];   locsScale[166]=[135,177,0];
    magentaScale[167]=[ 255,  97, 250];heatScale[167]=[ 238, 145,   0];rScale[167]=[167,0,0];gScale[167]=[0,167,0];bScale[167]=[0,0,167];    ocsScale[167]=[132,255,223];rainbowScale[167]=[199,198,85]; btcScale[167]=[97,250,255]; btyScale[167]=[191,191,161];lingreyScale[167]=[91,91,91];   locsScale[167]=[135,180,0];
    magentaScale[168]=[ 255,  99, 251];heatScale[168]=[ 239, 146,   0];rScale[168]=[168,0,0];gScale[168]=[0,168,0];bScale[168]=[0,0,168];    ocsScale[168]=[132,255,225];rainbowScale[168]=[199,198,85]; btcScale[168]=[99,251,255]; btyScale[168]=[191,191,160];lingreyScale[168]=[91,91,91];   locsScale[168]=[135,184,0];
    magentaScale[169]=[ 255, 102, 253];heatScale[169]=[ 241, 147,   0];rScale[169]=[169,0,0];gScale[169]=[0,169,0];bScale[169]=[0,0,169];    ocsScale[169]=[132,255,228];rainbowScale[169]=[203,198,86]; btcScale[169]=[102,253,255];btyScale[169]=[192,192,159];lingreyScale[169]=[94,94,94];   locsScale[169]=[135,188,0];
    magentaScale[170]=[ 255, 104, 255];heatScale[170]=[ 241, 147,   0];rScale[170]=[170,0,0];gScale[170]=[0,170,0];bScale[170]=[0,0,170];    ocsScale[170]=[132,255,230];rainbowScale[170]=[206,197,87]; btcScale[170]=[104,255,255];btyScale[170]=[193,193,159];lingreyScale[170]=[94,94,94];   locsScale[170]=[135,192,0];
    magentaScale[171]=[ 255, 106, 255];heatScale[171]=[ 242, 149,   0];rScale[171]=[171,0,0];gScale[171]=[0,171,0];bScale[171]=[0,0,171];    ocsScale[171]=[132,255,233];rainbowScale[171]=[212,197,89]; btcScale[171]=[106,255,255];btyScale[171]=[194,194,158];lingreyScale[171]=[94,94,94];   locsScale[171]=[135,195,0];
    magentaScale[172]=[ 255, 106, 255];heatScale[172]=[ 244, 150,   0];rScale[172]=[172,0,0];gScale[172]=[0,172,0];bScale[172]=[0,0,172];    ocsScale[172]=[132,255,235];rainbowScale[172]=[215,196,90]; btcScale[172]=[106,255,255];btyScale[172]=[194,194,158];lingreyScale[172]=[97,97,97];   locsScale[172]=[135,200,0];
    magentaScale[173]=[ 255, 108, 255];heatScale[173]=[ 244, 150,   0];rScale[173]=[173,0,0];gScale[173]=[0,173,0];bScale[173]=[0,0,173];    ocsScale[173]=[132,255,238];rainbowScale[173]=[218,195,91]; btcScale[173]=[108,255,255];btyScale[173]=[195,195,157];lingreyScale[173]=[97,97,97];   locsScale[173]=[135,203,0];
    magentaScale[174]=[ 255, 111, 255];heatScale[174]=[ 245, 151,   0];rScale[174]=[174,0,0];gScale[174]=[0,174,0];bScale[174]=[0,0,174];    ocsScale[174]=[132,255,240];rainbowScale[174]=[224,194,94]; btcScale[174]=[111,255,255];btyScale[174]=[196,196,157];lingreyScale[174]=[101,101,101];locsScale[174]=[135,205,0];
    magentaScale[175]=[ 255, 113, 255];heatScale[175]=[ 247, 153,   0];rScale[175]=[175,0,0];gScale[175]=[0,175,0];bScale[175]=[0,0,175];    ocsScale[175]=[132,255,243];rainbowScale[175]=[224,194,94]; btcScale[175]=[113,255,255];btyScale[175]=[196,196,156];lingreyScale[175]=[101,101,101];locsScale[175]=[135,210,0];
    magentaScale[176]=[ 255, 115, 255];heatScale[176]=[ 247, 153,   0];rScale[176]=[176,0,0];gScale[176]=[0,176,0];bScale[176]=[0,0,176];    ocsScale[176]=[132,255,245];rainbowScale[176]=[230,193,96]; btcScale[176]=[115,255,255];btyScale[176]=[197,197,155];lingreyScale[176]=[104,104,104];locsScale[176]=[135,214,0];
    magentaScale[177]=[ 255, 115, 255];heatScale[177]=[ 248, 154,   0];rScale[177]=[177,0,0];gScale[177]=[0,177,0];bScale[177]=[0,0,177];    ocsScale[177]=[132,255,248];rainbowScale[177]=[233,192,98]; btcScale[177]=[115,255,255];btyScale[177]=[198,198,155];lingreyScale[177]=[104,104,104];locsScale[177]=[135,218,0];
    magentaScale[178]=[ 255, 118, 255];heatScale[178]=[ 250, 155,   0];rScale[178]=[178,0,0];gScale[178]=[0,178,0];bScale[178]=[0,0,178];    ocsScale[178]=[132,255,250];rainbowScale[178]=[236,190,100];btcScale[178]=[118,255,255];btyScale[178]=[199,199,154];lingreyScale[178]=[107,107,107];locsScale[178]=[135,222,0];
    magentaScale[179]=[ 255, 120, 255];heatScale[179]=[ 251, 156,   0];rScale[179]=[179,0,0];gScale[179]=[0,179,0];bScale[179]=[0,0,179];    ocsScale[179]=[132,255,253];rainbowScale[179]=[238,189,104];btcScale[179]=[120,255,255];btyScale[179]=[199,199,153];lingreyScale[179]=[107,107,107];locsScale[179]=[135,226,0];
    magentaScale[180]=[ 255, 122, 255];heatScale[180]=[ 251, 156,   0];rScale[180]=[180,0,0];gScale[180]=[0,180,0];bScale[180]=[0,0,180];    ocsScale[180]=[132,255,255];rainbowScale[180]=[240,188,106];btcScale[180]=[122,255,255];btyScale[180]=[200,200,153];lingreyScale[180]=[107,107,107];locsScale[180]=[135,231,0];
    magentaScale[181]=[ 255, 122, 255];heatScale[181]=[ 253, 158,   0];rScale[181]=[181,0,0];gScale[181]=[0,181,0];bScale[181]=[0,0,181];    ocsScale[181]=[132,255,255];rainbowScale[181]=[240,188,106];btcScale[181]=[122,255,255];btyScale[181]=[201,201,152];lingreyScale[181]=[108,108,108];locsScale[181]=[135,236,0];
    magentaScale[182]=[ 255, 125, 255];heatScale[182]=[ 255, 159,   0];rScale[182]=[182,0,0];gScale[182]=[0,182,0];bScale[182]=[0,0,182];    ocsScale[182]=[132,255,255];rainbowScale[182]=[242,187,110];btcScale[182]=[125,255,255];btyScale[182]=[201,201,151];lingreyScale[182]=[108,108,108];locsScale[182]=[135,239,0];
    magentaScale[183]=[ 255, 127, 255];heatScale[183]=[ 255, 159,   0];rScale[183]=[183,0,0];gScale[183]=[0,183,0];bScale[183]=[0,0,183];    ocsScale[183]=[132,255,255];rainbowScale[183]=[244,185,114];btcScale[183]=[127,255,255];btyScale[183]=[202,202,151];lingreyScale[183]=[112,112,112];locsScale[183]=[135,244,0];
    magentaScale[184]=[ 255, 129, 255];heatScale[184]=[ 255, 160,   0];rScale[184]=[184,0,0];gScale[184]=[0,184,0];bScale[184]=[0,0,184];    ocsScale[184]=[132,255,255];rainbowScale[184]=[245,184,116];btcScale[184]=[129,255,255];btyScale[184]=[203,203,150];lingreyScale[184]=[112,112,112];locsScale[184]=[135,249,0];
    magentaScale[185]=[ 255, 129, 255];heatScale[185]=[ 255, 161,   0];rScale[185]=[185,0,0];gScale[185]=[0,185,0];bScale[185]=[0,0,185];    ocsScale[185]=[132,255,255];rainbowScale[185]=[247,183,120];btcScale[185]=[129,255,255];btyScale[185]=[204,204,149];lingreyScale[185]=[116,116,116];locsScale[185]=[135,254,0];
    magentaScale[186]=[ 255, 132, 255];heatScale[186]=[ 255, 163,   0];rScale[186]=[186,0,0];gScale[186]=[0,186,0];bScale[186]=[0,0,186];    ocsScale[186]=[132,255,255];rainbowScale[186]=[248,182,123];btcScale[186]=[132,255,255];btyScale[186]=[204,204,149];lingreyScale[186]=[116,116,116];locsScale[186]=[135,255,1];
    magentaScale[187]=[ 255, 134, 255];heatScale[187]=[ 255, 163,   0];rScale[187]=[187,0,0];gScale[187]=[0,187,0];bScale[187]=[0,0,187];    ocsScale[187]=[132,255,255];rainbowScale[187]=[248,182,123];btcScale[187]=[134,255,255];btyScale[187]=[205,205,148];lingreyScale[187]=[116,116,116];locsScale[187]=[135,255,5];
    magentaScale[188]=[ 255, 136, 255];heatScale[188]=[ 255, 164,   0];rScale[188]=[188,0,0];gScale[188]=[0,188,0];bScale[188]=[0,0,188];    ocsScale[188]=[132,255,255];rainbowScale[188]=[250,181,125];btcScale[188]=[136,255,255];btyScale[188]=[206,206,147];lingreyScale[188]=[120,120,120];locsScale[188]=[135,255,10];
    magentaScale[189]=[ 255, 136, 255];heatScale[189]=[ 255, 165,   0];rScale[189]=[189,0,0];gScale[189]=[0,189,0];bScale[189]=[0,0,189];    ocsScale[189]=[132,255,255];rainbowScale[189]=[251,180,128];btcScale[189]=[136,255,255];btyScale[189]=[206,206,146];lingreyScale[189]=[120,120,120];locsScale[189]=[135,255,15];
    magentaScale[190]=[ 255, 139, 255];heatScale[190]=[ 255, 167,   0];rScale[190]=[190,0,0];gScale[190]=[0,190,0];bScale[190]=[0,0,190];    ocsScale[190]=[132,255,255];rainbowScale[190]=[252,180,130];btcScale[190]=[139,255,255];btyScale[190]=[207,207,146];lingreyScale[190]=[124,124,124];locsScale[190]=[135,255,20];
    magentaScale[191]=[ 255, 141, 255];heatScale[191]=[ 255, 167,   0];rScale[191]=[191,0,0];gScale[191]=[0,191,0];bScale[191]=[0,0,191];    ocsScale[191]=[132,255,255];rainbowScale[191]=[253,180,133];btcScale[191]=[141,255,255];btyScale[191]=[208,208,145];lingreyScale[191]=[124,124,124];locsScale[191]=[135,255,23];
    magentaScale[192]=[ 255, 143, 255];heatScale[192]=[ 255, 168,   0];rScale[192]=[192,0,0];gScale[192]=[0,192,0];bScale[192]=[0,0,192];    ocsScale[192]=[132,255,255];rainbowScale[192]=[253,180,133];btcScale[192]=[143,255,255];btyScale[192]=[209,209,144];lingreyScale[192]=[128,128,128];locsScale[192]=[135,255,28];
    magentaScale[193]=[ 255, 143, 255];heatScale[193]=[ 255, 169,   0];rScale[193]=[193,0,0];gScale[193]=[0,193,0];bScale[193]=[0,0,193];    ocsScale[193]=[132,255,255];rainbowScale[193]=[254,180,134];btcScale[193]=[143,255,255];btyScale[193]=[209,209,143];lingreyScale[193]=[128,128,128];locsScale[193]=[135,255,33];
    magentaScale[194]=[ 255, 146, 255];heatScale[194]=[ 255, 169,   0];rScale[194]=[194,0,0];gScale[194]=[0,194,0];bScale[194]=[0,0,194];    ocsScale[194]=[132,255,255];rainbowScale[194]=[254,179,138];btcScale[194]=[146,255,255];btyScale[194]=[210,210,143];lingreyScale[194]=[128,128,128];locsScale[194]=[135,255,38];
    magentaScale[195]=[ 255, 148, 255];heatScale[195]=[ 255, 170,   0];rScale[195]=[195,0,0];gScale[195]=[0,195,0];bScale[195]=[0,0,195];    ocsScale[195]=[132,255,255];rainbowScale[195]=[255,179,142];btcScale[195]=[148,255,255];btyScale[195]=[211,211,142];lingreyScale[195]=[132,132,132];locsScale[195]=[135,255,43];
    magentaScale[196]=[ 255, 150, 255];heatScale[196]=[ 255, 172,   0];rScale[196]=[196,0,0];gScale[196]=[0,196,0];bScale[196]=[0,0,196];    ocsScale[196]=[132,255,255];rainbowScale[196]=[255,179,145];btcScale[196]=[150,255,255];btyScale[196]=[211,211,141];lingreyScale[196]=[132,132,132];locsScale[196]=[135,255,45];
    magentaScale[197]=[ 255, 150, 255];heatScale[197]=[ 255, 173,   0];rScale[197]=[197,0,0];gScale[197]=[0,197,0];bScale[197]=[0,0,197];    ocsScale[197]=[132,255,255];rainbowScale[197]=[255,179,145];btcScale[197]=[150,255,255];btyScale[197]=[212,212,140];lingreyScale[197]=[136,136,136];locsScale[197]=[135,255,49];
    magentaScale[198]=[ 255, 153, 255];heatScale[198]=[ 255, 173,   0];rScale[198]=[198,0,0];gScale[198]=[0,198,0];bScale[198]=[0,0,198];    ocsScale[198]=[132,255,255];rainbowScale[198]=[255,179,152];btcScale[198]=[153,255,255];btyScale[198]=[213,213,139];lingreyScale[198]=[136,136,136];locsScale[198]=[135,255,54];
    magentaScale[199]=[ 255, 155, 255];heatScale[199]=[ 255, 174,   0];rScale[199]=[199,0,0];gScale[199]=[0,199,0];bScale[199]=[0,0,199];    ocsScale[199]=[132,255,255];rainbowScale[199]=[255,180,161];btcScale[199]=[155,255,255];btyScale[199]=[214,214,138];lingreyScale[199]=[141,141,141];locsScale[199]=[135,255,59];
    magentaScale[200]=[ 255, 155, 255];heatScale[200]=[ 255, 175,   0];rScale[200]=[200,0,0];gScale[200]=[0,200,0];bScale[200]=[0,0,200];    ocsScale[200]=[132,255,255];rainbowScale[200]=[255,180,164];btcScale[200]=[155,255,255];btyScale[200]=[214,214,138];lingreyScale[200]=[141,141,141];locsScale[200]=[135,255,65];
    magentaScale[201]=[ 255, 157, 255];heatScale[201]=[ 255, 177,   0];rScale[201]=[201,0,0];gScale[201]=[0,201,0];bScale[201]=[0,0,201];    ocsScale[201]=[132,255,255];rainbowScale[201]=[255,180,167];btcScale[201]=[157,255,255];btyScale[201]=[215,215,137];lingreyScale[201]=[145,145,145];locsScale[201]=[135,255,70];
    magentaScale[202]=[ 255, 159, 255];heatScale[202]=[ 255, 178,   0];rScale[202]=[202,0,0];gScale[202]=[0,202,0];bScale[202]=[0,0,202];    ocsScale[202]=[132,255,255];rainbowScale[202]=[255,180,167];btcScale[202]=[159,255,255];btyScale[202]=[216,216,136];lingreyScale[202]=[145,145,145];locsScale[202]=[135,255,74];
    magentaScale[203]=[ 255, 159, 255];heatScale[203]=[ 255, 179,   0];rScale[203]=[203,0,0];gScale[203]=[0,203,0];bScale[203]=[0,0,203];    ocsScale[203]=[132,255,255];rainbowScale[203]=[255,181,169];btcScale[203]=[159,255,255];btyScale[203]=[216,216,135];lingreyScale[203]=[145,145,145];locsScale[203]=[135,255,80];
    magentaScale[204]=[ 255, 162, 255];heatScale[204]=[ 255, 181,   0];rScale[204]=[204,0,0];gScale[204]=[0,204,0];bScale[204]=[0,0,204];    ocsScale[204]=[132,255,255];rainbowScale[204]=[255,181,170];btcScale[204]=[162,255,255];btyScale[204]=[217,217,134];lingreyScale[204]=[147,147,147];locsScale[204]=[135,255,84];
    magentaScale[205]=[ 255, 164, 255];heatScale[205]=[ 255, 181,   0];rScale[205]=[205,0,0];gScale[205]=[0,205,0];bScale[205]=[0,0,205];    ocsScale[205]=[135,255,255];rainbowScale[205]=[255,182,173];btcScale[205]=[164,255,255];btyScale[205]=[218,218,133];lingreyScale[205]=[147,147,147];locsScale[205]=[135,255,90];
    magentaScale[206]=[ 255, 164, 255];heatScale[206]=[ 255, 182,   0];rScale[206]=[206,0,0];gScale[206]=[0,206,0];bScale[206]=[0,0,206];    ocsScale[206]=[137,255,255];rainbowScale[206]=[255,183,176];btcScale[206]=[164,255,255];btyScale[206]=[219,219,132];lingreyScale[206]=[150,150,150];locsScale[206]=[135,255,95];
    magentaScale[207]=[ 255, 166, 255];heatScale[207]=[ 255, 183,   0];rScale[207]=[207,0,0];gScale[207]=[0,207,0];bScale[207]=[0,0,207];    ocsScale[207]=[140,255,255];rainbowScale[207]=[255,183,176];btcScale[207]=[166,255,255];btyScale[207]=[219,219,131];lingreyScale[207]=[150,150,150];locsScale[207]=[135,255,98];
    magentaScale[208]=[ 255, 169, 255];heatScale[208]=[ 255, 184,   0];rScale[208]=[208,0,0];gScale[208]=[0,208,0];bScale[208]=[0,0,208];    ocsScale[208]=[143,255,255];rainbowScale[208]=[255,184,179];btcScale[208]=[169,255,255];btyScale[208]=[220,220,130];lingreyScale[208]=[154,154,154];locsScale[208]=[135,255,104];
    magentaScale[209]=[ 255, 171, 255];heatScale[209]=[ 255, 187,   7];rScale[209]=[209,0,0];gScale[209]=[0,209,0];bScale[209]=[0,0,209];    ocsScale[209]=[145,255,255];rainbowScale[209]=[255,185,179];btcScale[209]=[171,255,255];btyScale[209]=[221,221,129];lingreyScale[209]=[154,154,154];locsScale[209]=[135,255,110];
    magentaScale[210]=[ 255, 171, 255];heatScale[210]=[ 255, 188,  10];rScale[210]=[210,0,0];gScale[210]=[0,210,0];bScale[210]=[0,0,210];    ocsScale[210]=[148,255,255];rainbowScale[210]=[255,185,182];btcScale[210]=[171,255,255];btyScale[210]=[221,221,128];lingreyScale[210]=[154,154,154];locsScale[210]=[135,255,116];
    magentaScale[211]=[ 255, 173, 255];heatScale[211]=[ 255, 189,  14];rScale[211]=[211,0,0];gScale[211]=[0,211,0];bScale[211]=[0,0,211];    ocsScale[211]=[150,255,255];rainbowScale[211]=[255,186,182];btcScale[211]=[173,255,255];btyScale[211]=[222,222,127];lingreyScale[211]=[159,159,159];locsScale[211]=[135,255,120];
    magentaScale[212]=[ 255, 176, 255];heatScale[212]=[ 255, 191,  18];rScale[212]=[212,0,0];gScale[212]=[0,212,0];bScale[212]=[0,0,212];    ocsScale[212]=[153,255,255];rainbowScale[212]=[255,186,182];btcScale[212]=[176,255,255];btyScale[212]=[223,223,126];lingreyScale[212]=[159,159,159];locsScale[212]=[135,255,125];
    magentaScale[213]=[ 255, 176, 255];heatScale[213]=[ 255, 192,  21];rScale[213]=[213,0,0];gScale[213]=[0,213,0];bScale[213]=[0,0,213];    ocsScale[213]=[155,255,255];rainbowScale[213]=[255,187,185];btcScale[213]=[176,255,255];btyScale[213]=[224,224,125];lingreyScale[213]=[164,164,164];locsScale[213]=[135,255,131];
    magentaScale[214]=[ 255, 178, 255];heatScale[214]=[ 255, 193,  25];rScale[214]=[214,0,0];gScale[214]=[0,214,0];bScale[214]=[0,0,214];    ocsScale[214]=[158,255,255];rainbowScale[214]=[255,188,185];btcScale[214]=[178,255,255];btyScale[214]=[224,224,124];lingreyScale[214]=[164,164,164];locsScale[214]=[135,255,137];
    magentaScale[215]=[ 255, 180, 255];heatScale[215]=[ 255, 195,  29];rScale[215]=[215,0,0];gScale[215]=[0,215,0];bScale[215]=[0,0,215];    ocsScale[215]=[160,255,255];rainbowScale[215]=[255,189,188];btcScale[215]=[180,255,255];btyScale[215]=[225,225,123];lingreyScale[215]=[169,169,169];locsScale[215]=[135,255,144];
    magentaScale[216]=[ 255, 180, 255];heatScale[216]=[ 255, 197,  36];rScale[216]=[216,0,0];gScale[216]=[0,216,0];bScale[216]=[0,0,216];    ocsScale[216]=[163,255,255];rainbowScale[216]=[255,189,188];btcScale[216]=[180,255,255];btyScale[216]=[226,226,122];lingreyScale[216]=[169,169,169];locsScale[216]=[135,255,149];
    magentaScale[217]=[ 255, 183, 255];heatScale[217]=[ 255, 198,  40];rScale[217]=[217,0,0];gScale[217]=[0,217,0];bScale[217]=[0,0,217];    ocsScale[217]=[165,255,255];rainbowScale[217]=[255,190,188];btcScale[217]=[183,255,255];btyScale[217]=[226,226,121];lingreyScale[217]=[169,169,169];locsScale[217]=[135,255,154];
    magentaScale[218]=[ 255, 185, 255];heatScale[218]=[ 255, 200,  43];rScale[218]=[218,0,0];gScale[218]=[0,218,0];bScale[218]=[0,0,218];    ocsScale[218]=[168,255,255];rainbowScale[218]=[255,191,191];btcScale[218]=[185,255,255];btyScale[218]=[227,227,119];lingreyScale[218]=[174,174,174];locsScale[218]=[135,255,158];
    magentaScale[219]=[ 255, 185, 255];heatScale[219]=[ 255, 202,  51];rScale[219]=[219,0,0];gScale[219]=[0,219,0];bScale[219]=[0,0,219];    ocsScale[219]=[170,255,255];rainbowScale[219]=[255,192,191];btcScale[219]=[185,255,255];btyScale[219]=[228,228,118];lingreyScale[219]=[174,174,174];locsScale[219]=[135,255,165];
    magentaScale[220]=[ 255, 187, 255];heatScale[220]=[ 255, 204,  54];rScale[220]=[220,0,0];gScale[220]=[0,220,0];bScale[220]=[0,0,220];    ocsScale[220]=[173,255,255];rainbowScale[220]=[255,194,194];btcScale[220]=[187,255,255];btyScale[220]=[229,229,117];lingreyScale[220]=[179,179,179];locsScale[220]=[135,255,172];
    magentaScale[221]=[ 255, 190, 255];heatScale[221]=[ 255, 206,  61];rScale[221]=[221,0,0];gScale[221]=[0,221,0];bScale[221]=[0,0,221];    ocsScale[221]=[175,255,255];rainbowScale[221]=[255,194,194];btcScale[221]=[190,255,255];btyScale[221]=[229,229,116];lingreyScale[221]=[179,179,179];locsScale[221]=[135,255,179];
    magentaScale[222]=[ 255, 190, 255];heatScale[222]=[ 255, 207,  65];rScale[222]=[222,0,0];gScale[222]=[0,222,0];bScale[222]=[0,0,222];    ocsScale[222]=[178,255,255];rainbowScale[222]=[255,197,197];btcScale[222]=[190,255,255];btyScale[222]=[230,230,114];lingreyScale[222]=[185,185,185];locsScale[222]=[135,255,186];
    magentaScale[223]=[ 255, 192, 255];heatScale[223]=[ 255, 210,  72];rScale[223]=[223,0,0];gScale[223]=[0,223,0];bScale[223]=[0,0,223];    ocsScale[223]=[180,255,255];rainbowScale[223]=[255,198,198];btcScale[223]=[192,255,255];btyScale[223]=[231,231,113];lingreyScale[223]=[185,185,185];locsScale[223]=[135,255,191];
    magentaScale[224]=[ 255, 194, 255];heatScale[224]=[ 255, 211,  76];rScale[224]=[224,0,0];gScale[224]=[0,224,0];bScale[224]=[0,0,224];    ocsScale[224]=[183,255,255];rainbowScale[224]=[255,200,200];btcScale[224]=[194,255,255];btyScale[224]=[232,232,112];lingreyScale[224]=[190,190,190];locsScale[224]=[135,255,198];
    magentaScale[225]=[ 255, 197, 255];heatScale[225]=[ 255, 214,  83];rScale[225]=[225,0,0];gScale[225]=[0,225,0];bScale[225]=[0,0,225];    ocsScale[225]=[185,255,255];rainbowScale[225]=[255,201,201];btcScale[225]=[197,255,255];btyScale[225]=[232,232,110];lingreyScale[225]=[190,190,190];locsScale[225]=[135,255,203];
    magentaScale[226]=[ 255, 197, 255];heatScale[226]=[ 255, 216,  91];rScale[226]=[226,0,0];gScale[226]=[0,226,0];bScale[226]=[0,0,226];    ocsScale[226]=[188,255,255];rainbowScale[226]=[255,201,201];btcScale[226]=[197,255,255];btyScale[226]=[233,233,109];lingreyScale[226]=[190,190,190];locsScale[226]=[135,255,211];
    magentaScale[227]=[ 255, 199, 255];heatScale[227]=[ 255, 219,  98];rScale[227]=[227,0,0];gScale[227]=[0,227,0];bScale[227]=[0,0,227];    ocsScale[227]=[190,255,255];rainbowScale[227]=[255,202,202];btcScale[227]=[199,255,255];btyScale[227]=[234,234,107];lingreyScale[227]=[195,195,195];locsScale[227]=[135,255,216];
    magentaScale[228]=[ 255, 201, 255];heatScale[228]=[ 255, 221, 105];rScale[228]=[228,0,0];gScale[228]=[0,228,0];bScale[228]=[0,0,228];    ocsScale[228]=[193,255,255];rainbowScale[228]=[255,203,203];btcScale[228]=[201,255,255];btyScale[228]=[234,234,106];lingreyScale[228]=[195,195,195];locsScale[228]=[135,255,224];
    magentaScale[229]=[ 255, 204, 255];heatScale[229]=[ 255, 223, 109];rScale[229]=[229,0,0];gScale[229]=[0,229,0];bScale[229]=[0,0,229];    ocsScale[229]=[195,255,255];rainbowScale[229]=[255,205,205];btcScale[229]=[204,255,255];btyScale[229]=[235,235,104];lingreyScale[229]=[195,195,195];locsScale[229]=[135,255,232];
    magentaScale[230]=[ 255, 204, 255];heatScale[230]=[ 255, 225, 116];rScale[230]=[230,0,0];gScale[230]=[0,230,0];bScale[230]=[0,0,230];    ocsScale[230]=[198,255,255];rainbowScale[230]=[255,206,206];btcScale[230]=[204,255,255];btyScale[230]=[236,236,103];lingreyScale[230]=[195,195,195];locsScale[230]=[135,255,240];
    magentaScale[231]=[ 255, 206, 255];heatScale[231]=[ 255, 228, 123];rScale[231]=[231,0,0];gScale[231]=[0,231,0];bScale[231]=[0,0,231];    ocsScale[231]=[200,255,255];rainbowScale[231]=[255,206,206];btcScale[231]=[206,255,255];btyScale[231]=[237,237,101];lingreyScale[231]=[201,201,201];locsScale[231]=[135,255,248];
    magentaScale[232]=[ 255, 208, 255];heatScale[232]=[ 255, 232, 134];rScale[232]=[232,0,0];gScale[232]=[0,232,0];bScale[232]=[0,0,232];    ocsScale[232]=[203,255,255];rainbowScale[232]=[255,208,208];btcScale[232]=[208,255,255];btyScale[232]=[237,237,100];lingreyScale[232]=[201,201,201];locsScale[232]=[135,255,254];
    magentaScale[233]=[ 255, 210, 255];heatScale[233]=[ 255, 234, 142];rScale[233]=[233,0,0];gScale[233]=[0,233,0];bScale[233]=[0,0,233];    ocsScale[233]=[205,255,255];rainbowScale[233]=[255,209,209];btcScale[233]=[210,255,255];btyScale[233]=[238,238,98]; lingreyScale[233]=[201,201,201];locsScale[233]=[135,255,255];
    magentaScale[234]=[ 255, 210, 255];heatScale[234]=[ 255, 237, 149];rScale[234]=[234,0,0];gScale[234]=[0,234,0];bScale[234]=[0,0,234];    ocsScale[234]=[208,255,255];rainbowScale[234]=[255,211,211];btcScale[234]=[210,255,255];btyScale[234]=[239,239,96]; lingreyScale[234]=[207,207,207];locsScale[234]=[140,255,255];
    magentaScale[235]=[ 255, 213, 255];heatScale[235]=[ 255, 239, 156];rScale[235]=[235,0,0];gScale[235]=[0,235,0];bScale[235]=[0,0,235];    ocsScale[235]=[210,255,255];rainbowScale[235]=[255,215,215];btcScale[235]=[213,255,255];btyScale[235]=[239,239,94]; lingreyScale[235]=[207,207,207];locsScale[235]=[146,255,255];
    magentaScale[236]=[ 255, 215, 255];heatScale[236]=[ 255, 240, 160];rScale[236]=[236,0,0];gScale[236]=[0,236,0];bScale[236]=[0,0,236];    ocsScale[236]=[213,255,255];rainbowScale[236]=[255,216,216];btcScale[236]=[215,255,255];btyScale[236]=[240,240,92]; lingreyScale[236]=[212,212,212];locsScale[236]=[153,255,255];
    magentaScale[237]=[ 255, 217, 255];heatScale[237]=[ 255, 243, 167];rScale[237]=[237,0,0];gScale[237]=[0,237,0];bScale[237]=[0,0,237];    ocsScale[237]=[215,255,255];rainbowScale[237]=[255,216,216];btcScale[237]=[217,255,255];btyScale[237]=[241,241,91]; lingreyScale[237]=[212,212,212];locsScale[237]=[156,255,255];
    magentaScale[238]=[ 255, 217, 255];heatScale[238]=[ 255, 246, 174];rScale[238]=[238,0,0];gScale[238]=[0,238,0];bScale[238]=[0,0,238];    ocsScale[238]=[218,255,255];rainbowScale[238]=[255,218,218];btcScale[238]=[217,255,255];btyScale[238]=[242,242,89]; lingreyScale[238]=[218,218,218];locsScale[238]=[161,255,255];
    magentaScale[239]=[ 255, 220, 255];heatScale[239]=[ 255, 248, 182];rScale[239]=[239,0,0];gScale[239]=[0,239,0];bScale[239]=[0,0,239];    ocsScale[239]=[220,255,255];rainbowScale[239]=[255,219,219];btcScale[239]=[220,255,255];btyScale[239]=[242,242,86]; lingreyScale[239]=[218,218,218];locsScale[239]=[168,255,255];
    magentaScale[240]=[ 255, 222, 255];heatScale[240]=[ 255, 249, 185];rScale[240]=[240,0,0];gScale[240]=[0,240,0];bScale[240]=[0,0,240];    ocsScale[240]=[223,255,255];rainbowScale[240]=[255,221,221];btcScale[240]=[222,255,255];btyScale[240]=[243,243,84]; lingreyScale[240]=[218,218,218];locsScale[240]=[172,255,255];
    magentaScale[241]=[ 255, 224, 255];heatScale[241]=[ 255, 252, 193];rScale[241]=[241,0,0];gScale[241]=[0,241,0];bScale[241]=[0,0,241];    ocsScale[241]=[225,255,255];rainbowScale[241]=[255,223,223];btcScale[241]=[224,255,255];btyScale[241]=[244,244,82]; lingreyScale[241]=[224,224,224];locsScale[241]=[177,255,255];
    magentaScale[242]=[ 255, 227, 255];heatScale[242]=[ 255, 253, 196];rScale[242]=[242,0,0];gScale[242]=[0,242,0];bScale[242]=[0,0,242];    ocsScale[242]=[228,255,255];rainbowScale[242]=[255,226,226];btcScale[242]=[227,255,255];btyScale[242]=[245,245,80]; lingreyScale[242]=[224,224,224];locsScale[242]=[182,255,255];
    magentaScale[243]=[ 255, 229, 255];heatScale[243]=[ 255, 255, 204];rScale[243]=[243,0,0];gScale[243]=[0,243,0];bScale[243]=[0,0,243];    ocsScale[243]=[230,255,255];rainbowScale[243]=[255,228,228];btcScale[243]=[229,255,255];btyScale[243]=[245,245,77]; lingreyScale[243]=[230,230,230];locsScale[243]=[189,255,255];
    magentaScale[244]=[ 255, 229, 255];heatScale[244]=[ 255, 255, 207];rScale[244]=[244,0,0];gScale[244]=[0,244,0];bScale[244]=[0,0,244];    ocsScale[244]=[233,255,255];rainbowScale[244]=[255,230,230];btcScale[244]=[229,255,255];btyScale[244]=[246,246,74]; lingreyScale[244]=[230,230,230];locsScale[244]=[192,255,255];
    magentaScale[245]=[ 255, 231, 255];heatScale[245]=[ 255, 255, 211];rScale[245]=[245,0,0];gScale[245]=[0,245,0];bScale[245]=[0,0,245];    ocsScale[245]=[235,255,255];rainbowScale[245]=[255,230,230];btcScale[245]=[231,255,255];btyScale[245]=[247,247,72]; lingreyScale[245]=[237,237,237];locsScale[245]=[199,255,255];
    magentaScale[246]=[ 255, 234, 255];heatScale[246]=[ 255, 255, 218];rScale[246]=[246,0,0];gScale[246]=[0,246,0];bScale[246]=[0,0,246];    ocsScale[246]=[238,255,255];rainbowScale[246]=[255,232,232];btcScale[246]=[234,255,255];btyScale[246]=[247,247,69]; lingreyScale[246]=[237,237,237];locsScale[246]=[204,255,255];
    magentaScale[247]=[ 255, 236, 255];heatScale[247]=[ 255, 255, 222];rScale[247]=[247,0,0];gScale[247]=[0,247,0];bScale[247]=[0,0,247];    ocsScale[247]=[240,255,255];rainbowScale[247]=[255,235,235];btcScale[247]=[236,255,255];btyScale[247]=[248,248,65]; lingreyScale[247]=[243,243,243];locsScale[247]=[210,255,255];
    magentaScale[248]=[ 255, 238, 255];heatScale[248]=[ 255, 255, 225];rScale[248]=[248,0,0];gScale[248]=[0,248,0];bScale[248]=[0,0,248];    ocsScale[248]=[243,255,255];rainbowScale[248]=[255,237,237];btcScale[248]=[238,255,255];btyScale[248]=[249,249,62]; lingreyScale[248]=[243,243,243];locsScale[248]=[215,255,255];
    magentaScale[249]=[ 255, 241, 255];heatScale[249]=[ 255, 255, 229];rScale[249]=[249,0,0];gScale[249]=[0,249,0];bScale[249]=[0,0,249];    ocsScale[249]=[245,255,255];rainbowScale[249]=[255,240,240];btcScale[249]=[241,255,255];btyScale[249]=[250,250,58]; lingreyScale[249]=[243,243,243];locsScale[249]=[220,255,255];
    magentaScale[250]=[ 255, 243, 255];heatScale[250]=[ 255, 255, 233];rScale[250]=[250,0,0];gScale[250]=[0,250,0];bScale[250]=[0,0,250];    ocsScale[250]=[248,255,255];rainbowScale[250]=[255,243,243];btcScale[250]=[243,255,255];btyScale[250]=[250,250,54]; lingreyScale[250]=[249,249,249];locsScale[250]=[225,255,255];
    magentaScale[251]=[ 255, 243, 255];heatScale[251]=[ 255, 255, 236];rScale[251]=[251,0,0];gScale[251]=[0,251,0];bScale[251]=[0,0,251];    ocsScale[251]=[250,255,255];rainbowScale[251]=[255,246,246];btcScale[251]=[243,255,255];btyScale[251]=[251,251,49]; lingreyScale[251]=[249,249,249];locsScale[251]=[232,255,255];
    magentaScale[252]=[ 255, 245, 255];heatScale[252]=[ 255, 255, 240];rScale[252]=[252,0,0];gScale[252]=[0,252,0];bScale[252]=[0,0,252];    ocsScale[252]=[253,255,255];rainbowScale[252]=[255,249,249];btcScale[252]=[245,255,255];btyScale[252]=[252,252,44]; lingreyScale[252]=[252,252,252];locsScale[252]=[236,255,255];
    magentaScale[253]=[ 255, 248, 255];heatScale[253]=[ 255, 255, 244];rScale[253]=[253,0,0];gScale[253]=[0,253,0];bScale[253]=[0,0,253];    ocsScale[253]=[255,255,255];rainbowScale[253]=[255,251,251];btcScale[253]=[248,255,255];btyScale[253]=[253,253,37]; lingreyScale[253]=[252,252,252];locsScale[253]=[240,255,255];
    magentaScale[254]=[ 255, 250, 255];heatScale[254]=[ 255, 255, 247];rScale[254]=[254,0,0];gScale[254]=[0,254,0];bScale[254]=[0,0,254];    ocsScale[254]=[255,255,255];rainbowScale[254]=[255,253,253];btcScale[254]=[250,255,255];btyScale[254]=[253,253,28]; lingreyScale[254]=[252,252,252];locsScale[254]=[248,255,255];
    magentaScale[255]=[ 255, 255, 255];heatScale[255]=[ 255, 255, 255];rScale[255]=[255,0,0];gScale[255]=[0,255,0];bScale[255]=[0,0,255];    ocsScale[255]=[255,255,255];rainbowScale[255]=[255,255,255];btcScale[255]=[255,255,255];btyScale[255]=[254,254,13]; lingreyScale[255]=[255,255,255];locsScale[255]=[255,255,255];
        */

        //////////////////////////////////////////////////
        // computes the polygons with a scanline method //
        //////////////////////////////////////////////////
        function computePolygons(basecut, scaleY, mul, add, mins, maxs, tabledata, timepos, baselineType, start, end, optim){
          
          /*// timestamp of the minimum value
          if (isNaN(mint) && mint>=start && mint<=end) return;

	      let mins=0;
	      // minimum value
          if (baselineType=="Stratum" || baselineType=="Silhouette")
            mins = parseFloat(tabledata[mint]);

		  let maxs = tabledata[maxt];*/

          // no positive polygon when basecut is so high
          if (mul==1 && basecut==maxs) {return new Array();}
          // no negative polygon when basecut is so low
          if (mul==-1 && basecut==mins) {return new Array();}

          var polystack   = new Array();
          var locPolylist = new Array(); // polygons are built in local array so they can be sorted according to multiplier mul

          var valcut   = (basecut-mins)/(maxs-mins)*scaleY;
          var levelcut = Math.ceil(valcut);
          if (basecut==mins             && baselineType=="Stratum") levelcut=-1;
          if (basecut==Math.min(0,mins) && baselineType=="Stratum0") levelcut=-1;

          var val0 = ((tabledata[start]-basecut)*mul)*scaleY/(maxs-mins);
          var n0   = Math.floor(val0); // index of bands at beginning

          // TODO open/create many underlying polygons if not optim
		      // create the/all background polygon
          if (n0>0){
            if(n0==0)
              console.log("WARNING: n0 = 0 at the beginning");
            let lvl = n0;
            if(!optim){
              while(lvl > 0){
                polystack[lvl-1] = new Object();
                polystack[lvl-1].level = (lvl-1+add)*mul;
                polystack[lvl-1].ptx = new Array();
                polystack[lvl-1].pty = new Array();
                polystack[lvl-1].ptx.push(timepos[start]);
                polystack[lvl-1].pty.push(1.0);
                polystack[lvl-1].ptx.push(timepos[start]);
                polystack[lvl-1].pty.push(0);
                lvl --;
              }
            }
            else{
                polystack[n0-1] = new Object();
                polystack[n0-1].level = (n0-1+add)*mul;
                polystack[n0-1].ptx = new Array();
                polystack[n0-1].pty = new Array();
                polystack[n0-1].ptx.push(timepos[start]);
                polystack[n0-1].pty.push(1.0);
                polystack[n0-1].ptx.push(timepos[start]);
                polystack[n0-1].pty.push(0);
            }
          }
          //create the frontground polygon
          polystack[n0] = new Object();
          polystack[n0].level = (n0+add)*mul;

          polystack[n0].ptx = new Array();
          polystack[n0].pty = new Array();
          
          polystack[n0].ptx.push(timepos[start]);
          polystack[n0].pty.push(1.0);
          
          polystack[n0].ptx.push(timepos[start]);
          polystack[n0].pty.push(1.0-val0%1.0);

          var pt, pval; // variable to store the previous values of t and val

          for (var i=start; i<=end; i++) {
            if (isNaN(tabledata[i])) continue;
            var t   = timepos[i];

            var val = ((tabledata[i]-basecut)*mul)*scaleY/(maxs-mins);
            var n   = Math.floor(val); // band index

            if (n==n0 ){ // staying at the same level
              // If straight canvas useless to add additional points on underlying polygon
              //if (n0>0) {
              //  polystack[n0-1].ptx.push(t);
              //  polystack[n0-1].pty.push(0);
              //}

              if (n0>=0) {
                polystack[n0].ptx.push(t);
                polystack[n0].pty.push(1.0-val%1.0);
              }
              else {
				        console.log("WARNING: negative n0")  
		          }

            } else if (n<n0){// going down one or MANY level(s)
                while (n<n0){
                  var w1 = pval-n0
                  var w2 = n0-val;

                  var newt = (w1*t+w2*pt)/(w1+w2);
                  pt= newt;
                  pval = (n0);

                  if (n0>=0) {
                    polystack[n0].ptx.push(newt);
                    polystack[n0].pty.push(1.0);
                    var pol = polystack[n0];
                    var miny = pol.pty[0];
                    var maxy = pol.pty[0];
                    for (var l=0; l<pol.pty.length; l++){
                      miny = Math.min(miny, pol.pty[l]);
                      maxy = Math.max(maxy, pol.pty[l]);
                    }
                    if (miny!=maxy) 
                      locPolylist.push(pol);
                    else 
  				            console.log("WARNING: flat polygon");
                  } else {
  				            console.log("WARNING: negative n0");
  		            }

                  if (n0>0) {
                    polystack[n0-1].ptx.push(newt);
                    polystack[n0-1].pty.push(0);
                  }

                  polystack[n0]=null;
                  n0--;

                  if (n0>0 && optim) {
                    polystack[n0-1] = new Object();
                    polystack[n0-1].level = (n0-1+add)*mul;
                    polystack[n0-1].ptx = new Array();
                    polystack[n0-1].pty = new Array();
                    polystack[n0-1].ptx.push(newt);
                    polystack[n0-1].pty.push(1.0);
                    polystack[n0-1].ptx.push(newt);
                    polystack[n0-1].pty.push(0);
                  }
                }
                if (n0>=0) {
                  polystack[n0].ptx.push(t);
                  polystack[n0].pty.push(1.0-val%1.0);
                }
            } else if(n>n0) { // going up one or MANY level
              while (n>n0){
                var w1 = (n0+1)-pval;
                var w2 = val-(n0+1);
                var newt = (w1*t+w2*pt)/(w1+w2);

                if (n0>0 && optim) { // add 2 last points to the old background poly and store it in the list
                  polystack[n0-1].ptx.push(newt);
                  polystack[n0-1].pty.push(0);
                  polystack[n0-1].ptx.push(newt);
                  polystack[n0-1].pty.push(1.0);
                  var pol = polystack[n0-1];
                  var miny = pol.pty[0];
                  var maxy = pol.pty[0];
                  for (var l=0; l<pol.pty.length; l++){
                    miny = Math.min(miny, pol.pty[l]);
                    maxy = Math.max(maxy, pol.pty[l]);
                  }
                  
                  if (miny!=maxy) 
                    locPolylist.push(pol);
                  else 
				            console.log("WARNING: flat polygon");
                  
                  polystack[n0-1]=null;
                }

                pt   = newt;
                pval = (n0+1);

                // update the current poly (the one becoming the background !)
                if (n0>=0) {
                  polystack[n0].ptx.push(newt);
                  polystack[n0].pty.push(0);
                } else {
				  console.log("WARNING: negative n0");
		        }

                // increment the level and create a new polygon with 2 points
                n0++;
                polystack[n0] = new Object();
                polystack[n0].level = (n0+add)*mul;//+(levelcut+1)*((mul+1)/2);

                polystack[n0].ptx = new Array();
                polystack[n0].pty = new Array();
                polystack[n0].ptx.push(newt);
                polystack[n0].pty.push(1.0);
              }
              if (n0>=0) {
                polystack[n0].ptx.push(t);
                polystack[n0].pty.push(1.0-val%1.0);
              } else {
				console.log("WARNING: negative n0");
		      }
            }
            pval = val;
            pt   = t;
          }

          if (n0>=0) {// finish the on going polygon at the last level
            polystack[n0].ptx.push(timepos[end]); 
            polystack[n0].pty.push(1.0-val%1.0);
            polystack[n0].ptx.push(timepos[end]);
            polystack[n0].pty.push(1.0);
          }
          // TODO close many underlying polygons if not optim
          
          if (n0>0) {// finish on going polygons at the last level
            let lvl = n0;
            if(!optim){
              while(lvl > 0){
                polystack[lvl-1].ptx.push(timepos[end]);
                polystack[lvl-1].pty.push(0);
                polystack[lvl-1].ptx.push(timepos[end]);
                polystack[lvl-1].pty.push(1.0);
                var pol = polystack[lvl-1];
                var miny = pol.pty[0];
                var maxy = pol.pty[0];
                for (var l=0; l<pol.pty.length; l++){
                  miny = Math.min(miny, pol.pty[l]);
                  maxy = Math.max(maxy, pol.pty[l]);
                }
                lvl--;
                if (miny!=maxy) 
                  locPolylist.push(pol);
                else 
                   console.log("WARNING: flat polygon");
              }
            }
            else{
              polystack[n0-1].ptx.push(timepos[end]);
              polystack[n0-1].pty.push(0);
              polystack[n0-1].ptx.push(timepos[end]);
              polystack[n0-1].pty.push(1.0);
              var pol = polystack[n0-1];
              var miny = pol.pty[0];
              var maxy = pol.pty[0];
              for (var l=0; l<pol.pty.length; l++){
                miny = Math.min(miny, pol.pty[l]);
                maxy = Math.max(maxy, pol.pty[l]);
              }
              if (miny!=maxy) 
                locPolylist.push(pol);
              else 
                 console.log("WARNING: flat polygon");
            }
          }
          if (n0>=0) {
			// finish the on going polygon 
            var pol = polystack[n0];
            var miny = pol.pty[0];
            var maxy = pol.pty[0];
            for (var l=0; l<pol.pty.length; l++){
              miny = Math.min(miny, pol.pty[l]);
              maxy = Math.max(maxy, pol.pty[l]);
            }
            if (miny!=maxy) 
              locPolylist.push(pol);
            else 
			  console.log("WARNING: flat polygon");
          } else {
		    console.log("WARNING: negative n0");
		  }

          locPolylist.sort(function(a,b){return mul*(a.level-b.level)});

          return locPolylist;
        }


        // set shifted to true when you need a color in contrast with expected color
        function getColorForValue(value, minValue, maxValue, shifted) {
          //if (this.id=="ts5") console.log("getColorForValue"+minValue+" < "+value+" < "+maxValue)
          if(minValue==maxValue && value<minValue) return this.scale0[127];
          if(minValue==maxValue && value>maxValue) return this.scale1[127];
          if (value>maxValue) maxValue = value;
          if (value<minValue) minValue = value;
          if (value==undefined || isNaN(value)) return [255, 0, 0];
          if(minValue==maxValue) return this.scale0[127];

          //var normalized;
          //if (value>=0)  normalized = 10+Math.floor((value+1)*235/(maxValue+2));
          //else           normalized = 10+Math.floor((-1*value+1)*235/(-1*minValue+2));
          //var modulated = shifted?Math.min(255, Math.max(0,parseInt(10+(normalized-20)/2))):normalized;

          var modulated = 20+Math.floor((value-minValue)*215/(maxValue-minValue));
          if ((baselineType=="Top" || baselineType=="Horizon") && value>0){
            if (maxValue==1)
              modulated = 127;
            else
              modulated = 50+Math.floor((value-1)*205/(maxValue-1));
            //console.log(baselineType+"+  "+minValue+" < "+value+" < "+maxValue+" => "+modulated)
          }
          if ((baselineType=="Top" || baselineType=="Horizon") && value<0){
            if (minValue==-1)
              modulated = 127;
            else
              modulated = 255-Math.floor((minValue-value)*205/(minValue+1));
            //console.log(baselineType+"-  "+minValue+" < "+value+" < "+maxValue+" => "+modulated)
          }

          //if (value<0 && (baselineType!="Stratum" && baselineType!="Stratum0"))
          //  modulated = 255-modulated;
          if (shifted) {
            var tt = ((value-minValue)/(maxValue-minValue))+0.25;
            if (tt>1) tt-=1.0;
            modulated = 20+Math.floor(tt*215);
          }
          //normalized = Math.round((value-minValue)*255/(maxValue-minValue));
          //modulated = normalized;

          if (!this.scale0[255-modulated]) console.log("error "+modulated+" "+value+" "+minValue+" "+maxValue);

          if (baselineType=="Silhouette" || baselineType=="Silhouette0" || value<0){
            return this.scale0[this.colInv0?modulated:255-modulated];
          } else if (value>=0){
            return this.scale1[this.colInv1?modulated:255-modulated];
          } else
            return [value, 0, 0]; // default, should never happen ! if you see shade of red, track the bug
        }

const favicon = require('./assets/favicon.png');
let link = document.createElement('link');
link.type = 'image/png';
link.rel = 'shortcut icon';
link.href = favicon;
document.head.appendChild(link);

let data = new Float32Array(256);
let time = new Float32Array(256);
for (let i=0; i<256; i++){
  data[i] = 30.0+10*Math.cos(i/256*3*Math.PI);
  time[i] = i/255;
}
let mint = data[0];
let maxt = data[0];
for (let i=1; i<256; i++){
  if (data[i] < data[mint]) mint =i; 
  if (data[i] > data[maxt]) maxt =i;
}
let pols = new Array ();

let ZOOM = 7.24
var addHeight = 0;
var initHeight = 32;
var timer=null;
let BASELINE = 30;


//pols = computePolygons(BASELINE, ZOOM, 1, 1, BASELINE, data[maxt], data, time, "Stratum", 0, 255, false);

let polspos = computePolygons(BASELINE, ZOOM*(data[maxt]-BASELINE)/(data[maxt]-data[mint]), 1, 1, BASELINE, data[maxt], data, time, "Horizon", 0, 255, true);
let polsneg = computePolygons(BASELINE, ZOOM*(BASELINE-data[mint])/(data[maxt]-data[mint]), -1, 1, data[mint], BASELINE, data, time, "Horizon", 0, 255, true);
pols = pols.concat(polspos);
pols = pols.concat(polsneg);
let polsfill = [];


let can = document.createElement('canvas');
can.width = '1000';
can.height = initHeight;
can.addEventListener("mousedown", function(){
	 if (timer==null) {
		 //pols = computePolygons(BASELINE, ZOOM, 1, 1, BASELINE, data[maxt], data, time, "Stratum", 0, 255, true)

		 initHeight=can.height;
		 timer = setInterval(function(){
			 addHeight+=1;
			 if(addHeight>=(ZOOM-1)*initHeight)
			   clearInterval(timer);
       if(polsfill.length == 0){
          console.log("polsfill : " + polsfill);
          let polsposfill = computePolygons(BASELINE, ZOOM*(data[maxt]-BASELINE)/(data[maxt]-data[mint]), 1, 1, BASELINE, data[maxt], data, time, "Horizon", 0, 255, false);
          let polsnegfill = computePolygons(BASELINE, ZOOM*(BASELINE-data[mint])/(data[maxt]-data[mint]), -1, 1, data[mint], BASELINE, data, time, "Horizon", 0, 255, false);
          polsfill = polsfill.concat(polsposfill);
          polsfill = polsfill.concat(polsnegfill);
        }
			 draw(polsfill);
	  }, 12);
    } 
});

can.addEventListener("mouseup", function(){ 
  if (timer!=null)
    clearInterval(timer);
  timer = setInterval(function(){
	 if(addHeight<=0){
	   clearInterval(timer);
	   timer = null;
	 }
	 else
  	   addHeight-=1;
	 
	 draw(polsfill);
  }, 12);
});
document.body.appendChild(can);


function draw(polygons) {
	
  console.time('someFunction');
	if (can.height!=initHeight+addHeight)
	  can.height = initHeight+addHeight;

	let ctx = can.getContext("2d");
	ctx.fillStyle="#F0FF0F";	
	ctx.clearRect(0,0,can.width, can.height);
	let up = (data[maxt]-BASELINE)
	let propup = ZOOM*(up/(data[maxt]-data[mint]));
			console.log(propup); 

	for (let j in polygons){
	  ctx.save();
	  if (polygons[j].level>0){
		ctx.fillStyle="rgb(120, "+(polygons[j].level*255/ZOOM)+", 255)";
		ctx.beginPath();
		//(addHeight+addHeight/(Math.ceil(ZOOM-1)))-(addHeight*polygons[j].level/(Math.ceil(ZOOM-1))));
		ctx.moveTo(polygons[j].ptx[0]*can.width, polygons[j].pty[0]*initHeight+((addHeight*((Math.ceil(propup)-polygons[j].level)/(ZOOM-1))))-(1.0-propup%1)*addHeight/(ZOOM-1))
		for (let i=1; i<polygons[j].ptx.length; i++)
			ctx.lineTo(polygons[j].ptx[i]*can.width, polygons[j].pty[i]*initHeight+((addHeight*((Math.ceil(propup)-polygons[j].level)/(ZOOM-1))))-(1.0-propup%1)*addHeight/(ZOOM-1))
		ctx.closePath();
	  
	  }
	  else {
		ctx.fillStyle="rgb(255, "+((4+polygons[j].level)*255/ZOOM)+", 0)";
		let anim = addHeight/(ZOOM-1)/initHeight;
		//console.log((ZOOM-propup)+" * "+anim); 
		ctx.translate(0, 0+initHeight
						//+(1.0-anim)*initHeight
						+(propup-1)*initHeight*anim
		                 //+ addHeight+initHeight*Math.abs(polygons[j].level)*anim
		                // - (ZOOM-propup)*initHeight*anim
		             );
		ctx.scale(1.0,1.0*(1.0-anim)-1.0*(anim));
		ctx.translate(0, -initHeight
						 //-propup*initHeight*anim
						 //-addHeight*((Math.ceil(propup)-1)/(ZOOM-1))
					     -initHeight*Math.abs(polygons[j].level+1)*anim
					 );
		ctx.beginPath();
		
		ctx.moveTo(polygons[j].ptx[0]*can.width, polygons[j].pty[0]*initHeight);
		/*ctx.moveTo(polygons[j].ptx[0]*can.width, polygons[j].pty[0]*initHeight-((addHeight*((Math.ceil(ZOOM-2)-polygons[j].level)/(ZOOM-1))))+(1.0-propup%1)*addHeight/(ZOOM-1));
		for (let i=1; i<polygons[j].ptx.length; i++)
			ctx.lineTo(polygons[j].ptx[i]*can.width, polygons[j].pty[i]*initHeight-((addHeight*((Math.ceil(ZOOM-2)-polygons[j].level)/(ZOOM-1))))+(1.0-propup%1)*addHeight/(ZOOM-1));
		*/
		for (let i=1; i<polygons[j].ptx.length; i++)
			ctx.lineTo(polygons[j].ptx[i]*can.width, polygons[j].pty[i]*initHeight);
		ctx.closePath();
	  }
	  
	  
	  ctx.shadowColor = "#000";
	  ctx.shadowBlur = 1;
	  ctx.shadowOffsetX = 0;
	  ctx.shadowOffsetY = 0;

	  ctx.fill();
	  ctx.restore();
	}
	console.timeEnd('someFunction');
}

draw(pols);