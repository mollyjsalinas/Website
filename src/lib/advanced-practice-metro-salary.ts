// BLS OEWS May 2025 metropolitan estimates. Cross-industry, all ownerships (NAICS 000000; OWN_CODE 1235).
import type { AdvancedPracticeSalary } from "@/lib/advanced-practice-salary";

// BLS suppresses employment for some metros (null) while still publishing wages.
export type AdvancedPracticeMetroSalary = Omit<AdvancedPracticeSalary, "employment"> & { employment: number | null };

export const ADVANCED_PRACTICE_METRO_SALARIES: Record<string, Partial<Record<"np" | "pa", AdvancedPracticeMetroSalary>>> = {
  "10580": {
    "pa": {
      "employment": 770,
      "annual_mean_wage": 140600,
      "annual_median_wage": 137850
    },
    "np": {
      "employment": 910,
      "annual_mean_wage": 136720,
      "annual_median_wage": 134590
    }
  },
  "10740": {
    "pa": {
      "employment": 380,
      "annual_mean_wage": 135580,
      "annual_median_wage": 139920
    },
    "np": {
      "employment": 890,
      "annual_mean_wage": 148500,
      "annual_median_wage": 140950
    }
  },
  "10900": {
    "pa": {
      "employment": 560,
      "annual_mean_wage": 124750,
      "annual_median_wage": 129680
    },
    "np": {
      "employment": 790,
      "annual_mean_wage": 134150,
      "annual_median_wage": 133890
    }
  },
  "11260": {
    "pa": {
      "employment": 460,
      "annual_mean_wage": 147510,
      "annual_median_wage": 152710
    },
    "np": {
      "employment": 410,
      "annual_mean_wage": 150380,
      "annual_median_wage": 157430
    }
  },
  "11460": {
    "pa": {
      "employment": 810,
      "annual_mean_wage": 137840,
      "annual_median_wage": 135310
    },
    "np": {
      "employment": 870,
      "annual_mean_wage": 148610,
      "annual_median_wage": 143580
    }
  },
  "11540": {
    "pa": {
      "employment": 120,
      "annual_mean_wage": 139150,
      "annual_median_wage": 128270
    },
    "np": {
      "employment": 150,
      "annual_mean_wage": 135160,
      "annual_median_wage": 129030
    }
  },
  "11700": {
    "pa": {
      "employment": 460,
      "annual_mean_wage": 133670,
      "annual_median_wage": 131260
    },
    "np": {
      "employment": 520,
      "annual_mean_wage": 127820,
      "annual_median_wage": 127770
    }
  },
  "12020": {
    "pa": {
      "employment": 160,
      "annual_mean_wage": 133630,
      "annual_median_wage": 125460
    },
    "np": {
      "employment": 240,
      "annual_mean_wage": 122730,
      "annual_median_wage": 128140
    }
  },
  "12060": {
    "pa": {
      "employment": 3970,
      "annual_mean_wage": 108080,
      "annual_median_wage": 111810
    },
    "np": {
      "employment": 5950,
      "annual_mean_wage": 134960,
      "annual_median_wage": 132500
    }
  },
  "12100": {
    "pa": {
      "employment": 150,
      "annual_mean_wage": 142570,
      "annual_median_wage": 153280
    },
    "np": {
      "employment": 430,
      "annual_mean_wage": 143530,
      "annual_median_wage": 143330
    }
  },
  "12260": {
    "pa": {
      "employment": 350,
      "annual_mean_wage": 115460,
      "annual_median_wage": 117240
    },
    "np": {
      "employment": 500,
      "annual_mean_wage": 120060,
      "annual_median_wage": 120270
    }
  },
  "12420": {
    "pa": {
      "employment": 680,
      "annual_mean_wage": 141290,
      "annual_median_wage": 134550
    },
    "np": {
      "employment": 2700,
      "annual_mean_wage": 135000,
      "annual_median_wage": 128050
    }
  },
  "12580": {
    "pa": {
      "employment": 1660,
      "annual_mean_wage": 140180,
      "annual_median_wage": 138790
    },
    "np": {
      "employment": 3800,
      "annual_mean_wage": 134060,
      "annual_median_wage": 131990
    }
  },
  "12620": {
    "pa": {
      "employment": 110,
      "annual_mean_wage": 135770,
      "annual_median_wage": 130380
    },
    "np": {
      "employment": 220,
      "annual_mean_wage": 135200,
      "annual_median_wage": 131460
    }
  },
  "12700": {
    "pa": {
      "employment": 100,
      "annual_mean_wage": 158730,
      "annual_median_wage": 162330
    },
    "np": {
      "employment": 210,
      "annual_mean_wage": 150360,
      "annual_median_wage": 139840
    }
  },
  "12940": {
    "pa": {
      "employment": 360,
      "annual_mean_wage": 120200,
      "annual_median_wage": 130670
    },
    "np": {
      "employment": 1010,
      "annual_mean_wage": 130450,
      "annual_median_wage": 129070
    }
  },
  "13220": {
    "pa": {
      "employment": 100,
      "annual_mean_wage": 126810,
      "annual_median_wage": 131750
    },
    "np": {
      "employment": 200,
      "annual_mean_wage": 130830,
      "annual_median_wage": 124790
    }
  },
  "13460": {
    "pa": {
      "employment": 220,
      "annual_mean_wage": 147600,
      "annual_median_wage": 148610
    },
    "np": {
      "employment": 190,
      "annual_mean_wage": 148410,
      "annual_median_wage": 159100
    }
  },
  "13740": {
    "pa": {
      "employment": 150,
      "annual_mean_wage": 138480,
      "annual_median_wage": 141470
    },
    "np": {
      "employment": 160,
      "annual_mean_wage": 131490,
      "annual_median_wage": 139050
    }
  },
  "13820": {
    "pa": {
      "employment": 280,
      "annual_mean_wage": 108080,
      "annual_median_wage": 105440
    },
    "np": {
      "employment": 1350,
      "annual_mean_wage": 113680,
      "annual_median_wage": 107700
    }
  },
  "13900": {
    "pa": {
      "employment": 80,
      "annual_mean_wage": 119610,
      "annual_median_wage": 129650
    },
    "np": {
      "employment": 220,
      "annual_mean_wage": 123750,
      "annual_median_wage": 130140
    }
  },
  "14260": {
    "pa": {
      "employment": 650,
      "annual_mean_wage": 132340,
      "annual_median_wage": 134800
    },
    "np": {
      "employment": 840,
      "annual_mean_wage": 136150,
      "annual_median_wage": 132610
    }
  },
  "14460": {
    "pa": {
      "employment": 3550,
      "annual_mean_wage": 147520,
      "annual_median_wage": 142410
    },
    "np": {
      "employment": 5990,
      "annual_mean_wage": 155480,
      "annual_median_wage": 147480
    }
  },
  "14500": {
    "pa": {
      "employment": 270,
      "annual_mean_wage": 144850,
      "annual_median_wage": 136540
    },
    "np": {
      "employment": 300,
      "annual_mean_wage": 128320,
      "annual_median_wage": 138820
    }
  },
  "14540": {
    "np": {
      "employment": 150,
      "annual_mean_wage": 120120,
      "annual_median_wage": 112970
    }
  },
  "14740": {
    "pa": {
      "employment": 70,
      "annual_mean_wage": 150420,
      "annual_median_wage": 153810
    },
    "np": {
      "employment": 160,
      "annual_mean_wage": 152440,
      "annual_median_wage": 156470
    }
  },
  "14860": {
    "pa": {
      "employment": 940,
      "annual_mean_wage": 146480,
      "annual_median_wage": 145400
    },
    "np": {
      "employment": 840,
      "annual_mean_wage": 145550,
      "annual_median_wage": 139330
    }
  },
  "15380": {
    "pa": {
      "employment": 1040,
      "annual_mean_wage": 127510,
      "annual_median_wage": 126360
    },
    "np": {
      "employment": 1190,
      "annual_mean_wage": 135110,
      "annual_median_wage": 132220
    }
  },
  "15540": {
    "pa": {
      "employment": 200,
      "annual_mean_wage": 156280,
      "annual_median_wage": 163560
    },
    "np": {
      "employment": 260,
      "annual_mean_wage": 139950,
      "annual_median_wage": 136000
    }
  },
  "15940": {
    "pa": {
      "employment": 130,
      "annual_mean_wage": 127100,
      "annual_median_wage": 126290
    },
    "np": {
      "employment": 440,
      "annual_mean_wage": 120450,
      "annual_median_wage": 118370
    }
  },
  "16220": {
    "pa": {
      "employment": 40,
      "annual_mean_wage": 123820,
      "annual_median_wage": 127640
    },
    "np": {
      "employment": 80,
      "annual_mean_wage": 127260,
      "annual_median_wage": 121810
    }
  },
  "16300": {
    "pa": {
      "employment": 80,
      "annual_mean_wage": 140730,
      "annual_median_wage": 129680
    },
    "np": {
      "employment": 240,
      "annual_mean_wage": 134750,
      "annual_median_wage": 129890
    }
  },
  "16580": {
    "pa": {
      "employment": 120,
      "annual_mean_wage": 138360,
      "annual_median_wage": 139950
    },
    "np": {
      "employment": 420,
      "annual_mean_wage": 134450,
      "annual_median_wage": 137100
    }
  },
  "16620": {
    "pa": {
      "employment": 190,
      "annual_mean_wage": 128860,
      "annual_median_wage": 126620
    },
    "np": {
      "employment": 370,
      "annual_mean_wage": 128430,
      "annual_median_wage": 129260
    }
  },
  "16700": {
    "pa": {
      "employment": 620,
      "annual_mean_wage": 123350,
      "annual_median_wage": 128920
    },
    "np": {
      "employment": 1050,
      "annual_mean_wage": 126750,
      "annual_median_wage": 127780
    }
  },
  "16740": {
    "pa": {
      "employment": 1680,
      "annual_mean_wage": 131190,
      "annual_median_wage": 133140
    },
    "np": {
      "employment": 1970,
      "annual_mean_wage": 133530,
      "annual_median_wage": 130310
    }
  },
  "16820": {
    "pa": {
      "employment": 130,
      "annual_mean_wage": 141350,
      "annual_median_wage": 133540
    },
    "np": {
      "employment": 480,
      "annual_mean_wage": 142830,
      "annual_median_wage": 142950
    }
  },
  "16860": {
    "pa": {
      "employment": 180,
      "annual_mean_wage": 119560,
      "annual_median_wage": 121600
    },
    "np": {
      "employment": 1000,
      "annual_mean_wage": 114900,
      "annual_median_wage": 116480
    }
  },
  "16940": {
    "pa": {
      "employment": 50,
      "annual_mean_wage": 129270,
      "annual_median_wage": 127790
    },
    "np": {
      "employment": 110,
      "annual_mean_wage": 133470,
      "annual_median_wage": 134890
    }
  },
  "16980": {
    "pa": {
      "employment": 3050,
      "annual_mean_wage": 134170,
      "annual_median_wage": 127940
    },
    "np": {
      "employment": 6530,
      "annual_mean_wage": 133040,
      "annual_median_wage": 131740
    }
  },
  "17140": {
    "pa": {
      "employment": 920,
      "annual_mean_wage": 122750,
      "annual_median_wage": 128520
    },
    "np": {
      "employment": 2820,
      "annual_mean_wage": 124370,
      "annual_median_wage": 128700
    }
  },
  "17660": {
    "pa": {
      "employment": 110,
      "annual_mean_wage": 136550,
      "annual_median_wage": 135240
    },
    "np": {
      "employment": 180,
      "annual_mean_wage": 136020,
      "annual_median_wage": 134950
    }
  },
  "17820": {
    "pa": {
      "employment": 440,
      "annual_mean_wage": 137760,
      "annual_median_wage": 135200
    },
    "np": {
      "employment": 470,
      "annual_mean_wage": 129980,
      "annual_median_wage": 129950
    }
  },
  "17860": {
    "pa": {
      "employment": 140,
      "annual_mean_wage": 132510,
      "annual_median_wage": 132220
    },
    "np": {
      "employment": 330,
      "annual_mean_wage": 124080,
      "annual_median_wage": 128930
    }
  },
  "17900": {
    "pa": {
      "employment": 400,
      "annual_mean_wage": 117840,
      "annual_median_wage": 115840
    },
    "np": {
      "employment": 920,
      "annual_mean_wage": 120550,
      "annual_median_wage": 118470
    }
  },
  "17980": {
    "pa": {
      "employment": 80,
      "annual_mean_wage": 112580,
      "annual_median_wage": 117030
    },
    "np": {
      "employment": 370,
      "annual_mean_wage": 117230,
      "annual_median_wage": 121530
    }
  },
  "18140": {
    "pa": {
      "employment": 1140,
      "annual_mean_wage": 150880,
      "annual_median_wage": 137550
    },
    "np": {
      "employment": 3140,
      "annual_mean_wage": 121430,
      "annual_median_wage": 124580
    }
  },
  "19100": {
    "pa": {
      "employment": 3230,
      "annual_mean_wage": 136770,
      "annual_median_wage": 134900
    },
    "np": {
      "employment": 7310,
      "annual_mean_wage": 130280,
      "annual_median_wage": 130980
    }
  },
  "19300": {
    "pa": {
      "employment": 40,
      "annual_mean_wage": 114770,
      "annual_median_wage": 112610
    },
    "np": {
      "employment": null,
      "annual_mean_wage": 109640,
      "annual_median_wage": 104410
    }
  },
  "19340": {
    "pa": {
      "employment": 110,
      "annual_mean_wage": 136520,
      "annual_median_wage": 137420
    },
    "np": {
      "employment": 390,
      "annual_mean_wage": 132620,
      "annual_median_wage": 130400
    }
  },
  "19430": {
    "pa": {
      "employment": 510,
      "annual_mean_wage": 136890,
      "annual_median_wage": 138400
    },
    "np": {
      "employment": 980,
      "annual_mean_wage": 116220,
      "annual_median_wage": 118210
    }
  },
  "19740": {
    "pa": {
      "employment": 1650,
      "annual_mean_wage": 141060,
      "annual_median_wage": 134540
    },
    "np": {
      "employment": 2310,
      "annual_mean_wage": 135320,
      "annual_median_wage": 134040
    }
  },
  "19780": {
    "pa": {
      "employment": 340,
      "annual_mean_wage": 137940,
      "annual_median_wage": 133830
    },
    "np": {
      "employment": 820,
      "annual_mean_wage": 138820,
      "annual_median_wage": 132230
    }
  },
  "19820": {
    "pa": {
      "employment": 2400,
      "annual_mean_wage": 132280,
      "annual_median_wage": 131830
    },
    "np": {
      "employment": 3400,
      "annual_mean_wage": 137290,
      "annual_median_wage": 134390
    }
  },
  "20100": {
    "pa": {
      "employment": 60,
      "annual_mean_wage": 138410,
      "annual_median_wage": 129190
    },
    "np": {
      "employment": 190,
      "annual_mean_wage": 127710,
      "annual_median_wage": 122930
    }
  },
  "20260": {
    "pa": {
      "employment": 200,
      "annual_mean_wage": 143590,
      "annual_median_wage": 135860
    },
    "np": {
      "employment": 420,
      "annual_mean_wage": 140360,
      "annual_median_wage": 136530
    }
  },
  "20500": {
    "pa": {
      "employment": 740,
      "annual_mean_wage": 135890,
      "annual_median_wage": 132670
    },
    "np": {
      "employment": 1450,
      "annual_mean_wage": 134390,
      "annual_median_wage": 132300
    }
  },
  "20740": {
    "pa": {
      "employment": 170,
      "annual_mean_wage": 137190,
      "annual_median_wage": 130090
    },
    "np": {
      "employment": 280,
      "annual_mean_wage": 136730,
      "annual_median_wage": 132530
    }
  },
  "21660": {
    "pa": {
      "employment": 240,
      "annual_mean_wage": 152100,
      "annual_median_wage": 145030
    },
    "np": {
      "employment": 290,
      "annual_mean_wage": 156230,
      "annual_median_wage": 145550
    }
  },
  "21780": {
    "pa": {
      "employment": 120,
      "annual_mean_wage": 135560,
      "annual_median_wage": 123410
    },
    "np": {
      "employment": 320,
      "annual_mean_wage": 118790,
      "annual_median_wage": 123450
    }
  },
  "21820": {
    "pa": {
      "employment": 70,
      "annual_mean_wage": 159680,
      "annual_median_wage": 164910
    },
    "np": {
      "employment": 80,
      "annual_mean_wage": 154680,
      "annual_median_wage": 144300
    }
  },
  "22020": {
    "pa": {
      "employment": 240,
      "annual_mean_wage": 133960,
      "annual_median_wage": 136610
    },
    "np": {
      "employment": 490,
      "annual_mean_wage": 127270,
      "annual_median_wage": 130070
    }
  },
  "22140": {
    "pa": {
      "employment": 50,
      "annual_mean_wage": 138820,
      "annual_median_wage": 142890
    },
    "np": {
      "employment": 60,
      "annual_mean_wage": 133530,
      "annual_median_wage": 126900
    }
  },
  "22220": {
    "pa": {
      "employment": 180,
      "annual_mean_wage": 135260,
      "annual_median_wage": 130810
    },
    "np": {
      "employment": 600,
      "annual_mean_wage": 130530,
      "annual_median_wage": 127380
    }
  },
  "22380": {
    "pa": {
      "employment": 70,
      "annual_mean_wage": 141390,
      "annual_median_wage": 135600
    },
    "np": {
      "employment": 130,
      "annual_mean_wage": 134370,
      "annual_median_wage": 128870
    }
  },
  "22420": {
    "pa": {
      "employment": 280,
      "annual_mean_wage": 127050,
      "annual_median_wage": 125190
    },
    "np": {
      "employment": 270,
      "annual_mean_wage": 127350,
      "annual_median_wage": 126020
    }
  },
  "22660": {
    "pa": {
      "employment": null,
      "annual_mean_wage": 136590,
      "annual_median_wage": 134260
    },
    "np": {
      "employment": 210,
      "annual_mean_wage": 129250,
      "annual_median_wage": 130330
    }
  },
  "22900": {
    "pa": {
      "employment": 70,
      "annual_mean_wage": 131270,
      "annual_median_wage": 119840
    },
    "np": {
      "employment": 270,
      "annual_mean_wage": 133650,
      "annual_median_wage": 129270
    }
  },
  "23060": {
    "pa": {
      "employment": 240,
      "annual_mean_wage": 148740,
      "annual_median_wage": 131400
    },
    "np": {
      "employment": 820,
      "annual_mean_wage": 123060,
      "annual_median_wage": 127050
    }
  },
  "24220": {
    "pa": {
      "employment": 70,
      "annual_mean_wage": 132590,
      "annual_median_wage": 133450
    },
    "np": {
      "employment": 190,
      "annual_mean_wage": 124730,
      "annual_median_wage": 130990
    }
  },
  "24260": {
    "pa": {
      "employment": 40,
      "annual_mean_wage": 137440,
      "annual_median_wage": 141590
    },
    "np": {
      "employment": 80,
      "annual_mean_wage": 123940,
      "annual_median_wage": 125690
    }
  },
  "24340": {
    "pa": {
      "employment": 940,
      "annual_mean_wage": 129820,
      "annual_median_wage": 131930
    },
    "np": {
      "employment": 970,
      "annual_mean_wage": 123610,
      "annual_median_wage": 125660
    }
  },
  "24500": {
    "pa": {
      "employment": 60,
      "annual_mean_wage": 138210,
      "annual_median_wage": 132740
    },
    "np": {
      "employment": 150,
      "annual_mean_wage": 130040,
      "annual_median_wage": 130330
    }
  },
  "24540": {
    "pa": {
      "employment": 140,
      "annual_mean_wage": 130090,
      "annual_median_wage": 134550
    },
    "np": {
      "employment": 140,
      "annual_mean_wage": 124270,
      "annual_median_wage": 130950
    }
  },
  "24580": {
    "pa": {
      "employment": 240,
      "annual_mean_wage": 130370,
      "annual_median_wage": 131720
    },
    "np": {
      "employment": 430,
      "annual_mean_wage": 128050,
      "annual_median_wage": 127540
    }
  },
  "24660": {
    "pa": {
      "employment": 420,
      "annual_mean_wage": 131080,
      "annual_median_wage": 120540
    },
    "np": {
      "employment": 820,
      "annual_mean_wage": 136110,
      "annual_median_wage": 132230
    }
  },
  "24860": {
    "pa": {
      "employment": 440,
      "annual_mean_wage": 116630,
      "annual_median_wage": 123310
    },
    "np": {
      "employment": 1120,
      "annual_mean_wage": 118850,
      "annual_median_wage": 119280
    }
  },
  "25060": {
    "pa": {
      "employment": 60,
      "annual_mean_wage": 113720,
      "annual_median_wage": 105920
    },
    "np": {
      "employment": 600,
      "annual_mean_wage": 129270,
      "annual_median_wage": 128150
    }
  },
  "25180": {
    "pa": {
      "employment": 120,
      "annual_mean_wage": 138820,
      "annual_median_wage": 137220
    },
    "np": {
      "employment": 360,
      "annual_mean_wage": 122920,
      "annual_median_wage": 126240
    }
  },
  "25420": {
    "pa": {
      "employment": 580,
      "annual_mean_wage": 121460,
      "annual_median_wage": 123110
    },
    "np": {
      "employment": 500,
      "annual_mean_wage": 135590,
      "annual_median_wage": 132670
    }
  },
  "25540": {
    "pa": {
      "employment": 1460,
      "annual_mean_wage": 142730,
      "annual_median_wage": 138680
    },
    "np": {
      "employment": 1370,
      "annual_mean_wage": 139310,
      "annual_median_wage": 135170
    }
  },
  "25620": {
    "pa": {
      "employment": 50,
      "annual_mean_wage": 110080,
      "annual_median_wage": 108420
    },
    "np": {
      "employment": 340,
      "annual_mean_wage": 119160,
      "annual_median_wage": 113300
    }
  },
  "25940": {
    "pa": {
      "employment": 80,
      "annual_mean_wage": 122000,
      "annual_median_wage": 125350
    },
    "np": {
      "employment": 260,
      "annual_mean_wage": 117880,
      "annual_median_wage": 119130
    }
  },
  "26300": {
    "pa": {
      "employment": 30,
      "annual_mean_wage": 128620,
      "annual_median_wage": 122720
    },
    "np": {
      "employment": 210,
      "annual_mean_wage": 134570,
      "annual_median_wage": 122940
    }
  },
  "26420": {
    "pa": {
      "employment": 2390,
      "annual_mean_wage": 135660,
      "annual_median_wage": 137240
    },
    "np": {
      "employment": 5970,
      "annual_mean_wage": 131980,
      "annual_median_wage": 134560
    }
  },
  "26580": {
    "pa": {
      "employment": 210,
      "annual_mean_wage": 125800,
      "annual_median_wage": 125690
    },
    "np": {
      "employment": 570,
      "annual_mean_wage": 123640,
      "annual_median_wage": 125780
    }
  },
  "26620": {
    "pa": {
      "employment": 110,
      "annual_mean_wage": 116600,
      "annual_median_wage": 107230
    },
    "np": {
      "employment": 830,
      "annual_mean_wage": 111310,
      "annual_median_wage": 103900
    }
  },
  "26820": {
    "pa": {
      "employment": 150,
      "annual_mean_wage": 127840,
      "annual_median_wage": 129800
    },
    "np": {
      "employment": 200,
      "annual_mean_wage": 135690,
      "annual_median_wage": 128260
    }
  },
  "26900": {
    "pa": {
      "employment": 700,
      "annual_mean_wage": 136870,
      "annual_median_wage": 131950
    },
    "np": {
      "employment": 2530,
      "annual_mean_wage": 130150,
      "annual_median_wage": 130460
    }
  },
  "26980": {
    "pa": {
      "employment": 230,
      "annual_mean_wage": 142700,
      "annual_median_wage": 134770
    },
    "np": {
      "employment": 330,
      "annual_mean_wage": 134050,
      "annual_median_wage": 129030
    }
  },
  "27140": {
    "pa": {
      "employment": 110,
      "annual_mean_wage": 98420,
      "annual_median_wage": 101830
    },
    "np": {
      "employment": 1310,
      "annual_mean_wage": 126930,
      "annual_median_wage": 124730
    }
  },
  "27260": {
    "pa": {
      "employment": 1100,
      "annual_mean_wage": 134090,
      "annual_median_wage": 132350
    },
    "np": {
      "employment": 2310,
      "annual_mean_wage": 133260,
      "annual_median_wage": 133810
    }
  },
  "27740": {
    "pa": {
      "employment": 130,
      "annual_mean_wage": 109060,
      "annual_median_wage": 100060
    },
    "np": {
      "employment": 380,
      "annual_mean_wage": 108530,
      "annual_median_wage": 102430
    }
  },
  "27860": {
    "pa": {
      "employment": 30,
      "annual_mean_wage": 111670,
      "annual_median_wage": 117660
    },
    "np": {
      "employment": 280,
      "annual_mean_wage": 129980,
      "annual_median_wage": 126760
    }
  },
  "27900": {
    "pa": {
      "employment": 70,
      "annual_mean_wage": 142860,
      "annual_median_wage": 150300
    },
    "np": {
      "employment": 230,
      "annual_mean_wage": 128980,
      "annual_median_wage": 126640
    }
  },
  "27980": {
    "pa": {
      "employment": 50,
      "annual_mean_wage": 134340,
      "annual_median_wage": 134960
    },
    "np": {
      "employment": 60,
      "annual_mean_wage": 162750,
      "annual_median_wage": 164210
    }
  },
  "28140": {
    "pa": {
      "employment": 540,
      "annual_mean_wage": 134340,
      "annual_median_wage": 133350
    },
    "np": {
      "employment": 2730,
      "annual_mean_wage": 130010,
      "annual_median_wage": 130760
    }
  },
  "28940": {
    "pa": {
      "employment": 240,
      "annual_mean_wage": 112760,
      "annual_median_wage": 107980
    },
    "np": {
      "employment": 1630,
      "annual_mean_wage": 112460,
      "annual_median_wage": 109740
    }
  },
  "29180": {
    "pa": {
      "employment": 100,
      "annual_mean_wage": 131080,
      "annual_median_wage": 134550
    },
    "np": {
      "employment": 480,
      "annual_mean_wage": 115980,
      "annual_median_wage": 120930
    }
  },
  "29420": {
    "pa": {
      "employment": 50,
      "annual_mean_wage": 128250,
      "annual_median_wage": 129460
    },
    "np": {
      "employment": 130,
      "annual_mean_wage": 132160,
      "annual_median_wage": 131450
    }
  },
  "29620": {
    "pa": {
      "employment": 260,
      "annual_mean_wage": 127770,
      "annual_median_wage": 128230
    },
    "np": {
      "employment": 270,
      "annual_mean_wage": 131230,
      "annual_median_wage": 129450
    }
  },
  "29740": {
    "pa": {
      "employment": 100,
      "annual_mean_wage": 125570,
      "annual_median_wage": 141350
    },
    "np": {
      "employment": 210,
      "annual_mean_wage": 134000,
      "annual_median_wage": 131990
    }
  },
  "29820": {
    "pa": {
      "employment": 650,
      "annual_mean_wage": 140860,
      "annual_median_wage": 134660
    },
    "np": {
      "employment": 1390,
      "annual_mean_wage": 138960,
      "annual_median_wage": 144060
    }
  },
  "29940": {
    "pa": {
      "employment": 30,
      "annual_mean_wage": 122450,
      "annual_median_wage": 126340
    },
    "np": {
      "employment": 100,
      "annual_mean_wage": 126700,
      "annual_median_wage": 126650
    }
  },
  "30020": {
    "pa": {
      "employment": 30,
      "annual_mean_wage": 137670,
      "annual_median_wage": 132220
    },
    "np": {
      "employment": 70,
      "annual_mean_wage": 129240,
      "annual_median_wage": 132940
    }
  },
  "30340": {
    "pa": {
      "employment": 80,
      "annual_mean_wage": 151970,
      "annual_median_wage": 143710
    },
    "np": {
      "employment": 180,
      "annual_mean_wage": 142750,
      "annual_median_wage": 135630
    }
  },
  "30460": {
    "pa": {
      "employment": 300,
      "annual_mean_wage": 118940,
      "annual_median_wage": 112230
    },
    "np": {
      "employment": 540,
      "annual_mean_wage": 127400,
      "annual_median_wage": 123070
    }
  },
  "30700": {
    "pa": {
      "employment": 290,
      "annual_mean_wage": 123400,
      "annual_median_wage": 128050
    },
    "np": {
      "employment": 320,
      "annual_mean_wage": 124660,
      "annual_median_wage": 124440
    }
  },
  "30780": {
    "pa": {
      "employment": 340,
      "annual_mean_wage": 108440,
      "annual_median_wage": 109110
    },
    "np": {
      "employment": 1360,
      "annual_mean_wage": 135630,
      "annual_median_wage": 126680
    }
  },
  "30860": {
    "pa": {
      "employment": 60,
      "annual_mean_wage": 119370,
      "annual_median_wage": 127350
    },
    "np": {
      "employment": 70,
      "annual_mean_wage": 131770,
      "annual_median_wage": 133110
    }
  },
  "31080": {
    "pa": {
      "employment": 3890,
      "annual_mean_wage": 163340,
      "annual_median_wage": 161890
    },
    "np": {
      "employment": 10060,
      "annual_mean_wage": 163610,
      "annual_median_wage": 161470
    }
  },
  "31140": {
    "pa": {
      "employment": 380,
      "annual_mean_wage": 129970,
      "annual_median_wage": 130830
    },
    "np": {
      "employment": 1580,
      "annual_mean_wage": 126690,
      "annual_median_wage": 122900
    }
  },
  "31540": {
    "pa": {
      "employment": 490,
      "annual_mean_wage": 129360,
      "annual_median_wage": 133950
    },
    "np": {
      "employment": 530,
      "annual_mean_wage": 138040,
      "annual_median_wage": 133080
    }
  },
  "31700": {
    "pa": {
      "employment": 260,
      "annual_mean_wage": 143210,
      "annual_median_wage": 139210
    },
    "np": {
      "employment": 550,
      "annual_mean_wage": 133760,
      "annual_median_wage": 131660
    }
  },
  "31740": {
    "np": {
      "employment": 90,
      "annual_mean_wage": 118700,
      "annual_median_wage": 115350
    }
  },
  "31860": {
    "pa": {
      "employment": 70,
      "annual_mean_wage": 143530,
      "annual_median_wage": 142020
    },
    "np": {
      "employment": 150,
      "annual_mean_wage": 145440,
      "annual_median_wage": 138580
    }
  },
  "32580": {
    "pa": {
      "employment": 400,
      "annual_mean_wage": 133860,
      "annual_median_wage": 131870
    },
    "np": {
      "employment": 770,
      "annual_mean_wage": 124580,
      "annual_median_wage": 122550
    }
  },
  "32780": {
    "pa": {
      "employment": 210,
      "annual_mean_wage": 157300,
      "annual_median_wage": 155110
    },
    "np": {
      "employment": 200,
      "annual_mean_wage": 150170,
      "annual_median_wage": 155580
    }
  },
  "32820": {
    "pa": {
      "employment": 290,
      "annual_mean_wage": 120440,
      "annual_median_wage": 121900
    },
    "np": {
      "employment": 1800,
      "annual_mean_wage": 121660,
      "annual_median_wage": 124600
    }
  },
  "33100": {
    "pa": {
      "employment": 2190,
      "annual_mean_wage": 137010,
      "annual_median_wage": 132360
    },
    "np": {
      "employment": 5810,
      "annual_mean_wage": 136150,
      "annual_median_wage": 131340
    }
  },
  "33340": {
    "pa": {
      "employment": 1220,
      "annual_mean_wage": 138410,
      "annual_median_wage": 135040
    },
    "np": {
      "employment": 1450,
      "annual_mean_wage": 137960,
      "annual_median_wage": 134350
    }
  },
  "33460": {
    "pa": {
      "employment": 2340,
      "annual_mean_wage": 147010,
      "annual_median_wage": 145030
    },
    "np": {
      "employment": 4900,
      "annual_mean_wage": 137660,
      "annual_median_wage": 133370
    }
  },
  "33540": {
    "pa": {
      "employment": 90,
      "annual_mean_wage": 135470,
      "annual_median_wage": 134990
    },
    "np": {
      "employment": 140,
      "annual_mean_wage": 131070,
      "annual_median_wage": 131650
    }
  },
  "33660": {
    "pa": {
      "employment": 140,
      "annual_mean_wage": 113570,
      "annual_median_wage": 104960
    },
    "np": {
      "employment": 510,
      "annual_mean_wage": 106530,
      "annual_median_wage": 103480
    }
  },
  "33740": {
    "pa": {
      "employment": 50,
      "annual_mean_wage": 133790,
      "annual_median_wage": 126190
    },
    "np": {
      "employment": 340,
      "annual_mean_wage": 128540,
      "annual_median_wage": 124340
    }
  },
  "33860": {
    "pa": {
      "employment": 60,
      "annual_mean_wage": 109960,
      "annual_median_wage": 102040
    },
    "np": {
      "employment": 330,
      "annual_mean_wage": 111410,
      "annual_median_wage": 105050
    }
  },
  "34060": {
    "pa": {
      "employment": 130,
      "annual_mean_wage": 125160,
      "annual_median_wage": 128170
    },
    "np": {
      "employment": 300,
      "annual_mean_wage": 126070,
      "annual_median_wage": 128130
    }
  },
  "34980": {
    "pa": {
      "employment": 750,
      "annual_mean_wage": 124670,
      "annual_median_wage": 129050
    },
    "np": {
      "employment": 4540,
      "annual_mean_wage": 118990,
      "annual_median_wage": 122320
    }
  },
  "35300": {
    "pa": {
      "employment": 740,
      "annual_mean_wage": 156420,
      "annual_median_wage": 149960
    },
    "np": {
      "employment": 920,
      "annual_mean_wage": 145320,
      "annual_median_wage": 140880
    }
  },
  "35380": {
    "pa": {
      "employment": 400,
      "annual_mean_wage": 136380,
      "annual_median_wage": 124580
    },
    "np": {
      "employment": 1270,
      "annual_mean_wage": 128310,
      "annual_median_wage": 124800
    }
  },
  "35620": {
    "pa": {
      "employment": 16800,
      "annual_mean_wage": 163570,
      "annual_median_wage": 167650
    },
    "np": {
      "employment": 21680,
      "annual_mean_wage": 162620,
      "annual_median_wage": 163340
    }
  },
  "35840": {
    "pa": {
      "employment": 520,
      "annual_mean_wage": 146740,
      "annual_median_wage": 142510
    },
    "np": {
      "employment": 630,
      "annual_mean_wage": 133020,
      "annual_median_wage": 134470
    }
  },
  "35980": {
    "pa": {
      "employment": 180,
      "annual_mean_wage": 151540,
      "annual_median_wage": 140030
    },
    "np": {
      "employment": 170,
      "annual_mean_wage": 138870,
      "annual_median_wage": 135930
    }
  },
  "36260": {
    "pa": {
      "employment": 220,
      "annual_mean_wage": 133690,
      "annual_median_wage": 135930
    },
    "np": {
      "employment": 330,
      "annual_mean_wage": 131600,
      "annual_median_wage": 129000
    }
  },
  "36420": {
    "pa": {
      "employment": 1020,
      "annual_mean_wage": 138060,
      "annual_median_wage": 138920
    },
    "np": {
      "employment": 1670,
      "annual_mean_wage": 134480,
      "annual_median_wage": 133390
    }
  },
  "36500": {
    "pa": {
      "employment": 90,
      "annual_mean_wage": 156570,
      "annual_median_wage": 153940
    },
    "np": {
      "employment": 180,
      "annual_mean_wage": 148070,
      "annual_median_wage": 145950
    }
  },
  "36540": {
    "pa": {
      "employment": 720,
      "annual_mean_wage": 135930,
      "annual_median_wage": 134130
    },
    "np": {
      "employment": 1380,
      "annual_mean_wage": 133180,
      "annual_median_wage": 133760
    }
  },
  "36740": {
    "pa": {
      "employment": 1200,
      "annual_mean_wage": 131770,
      "annual_median_wage": 127200
    },
    "np": {
      "employment": 1950,
      "annual_mean_wage": 128860,
      "annual_median_wage": 130640
    }
  },
  "36980": {
    "np": {
      "employment": 150,
      "annual_mean_wage": 129790,
      "annual_median_wage": 128780
    }
  },
  "37620": {
    "pa": {
      "employment": 60,
      "annual_mean_wage": 125740,
      "annual_median_wage": 125290
    },
    "np": {
      "employment": 170,
      "annual_mean_wage": 122640,
      "annual_median_wage": 126550
    }
  },
  "37900": {
    "pa": {
      "employment": 110,
      "annual_mean_wage": 132850,
      "annual_median_wage": 133170
    },
    "np": {
      "employment": 320,
      "annual_mean_wage": 126280,
      "annual_median_wage": 128920
    }
  },
  "37980": {
    "pa": {
      "employment": 3390,
      "annual_mean_wage": 139080,
      "annual_median_wage": 135640
    },
    "np": {
      "employment": 6590,
      "annual_mean_wage": 139700,
      "annual_median_wage": 135700
    }
  },
  "38060": {
    "pa": {
      "employment": 3050,
      "annual_mean_wage": 140520,
      "annual_median_wage": 134650
    },
    "np": {
      "employment": 5450,
      "annual_mean_wage": 141960,
      "annual_median_wage": 136270
    }
  },
  "38300": {
    "pa": {
      "employment": 2560,
      "annual_mean_wage": 120080,
      "annual_median_wage": 125230
    },
    "np": {
      "employment": 1980,
      "annual_mean_wage": 123580,
      "annual_median_wage": 119630
    }
  },
  "38540": {
    "pa": {
      "employment": 80,
      "annual_mean_wage": 125940,
      "annual_median_wage": 129480
    },
    "np": {
      "employment": 90,
      "annual_mean_wage": 120580,
      "annual_median_wage": 125690
    }
  },
  "38860": {
    "pa": {
      "employment": 490,
      "annual_mean_wage": 131600,
      "annual_median_wage": 131180
    },
    "np": {
      "employment": 720,
      "annual_mean_wage": 130580,
      "annual_median_wage": 130240
    }
  },
  "38900": {
    "pa": {
      "employment": 1110,
      "annual_mean_wage": 160130,
      "annual_median_wage": 163810
    },
    "np": {
      "employment": 1390,
      "annual_mean_wage": 160020,
      "annual_median_wage": 158890
    }
  },
  "39150": {
    "pa": {
      "employment": 120,
      "annual_mean_wage": 138590,
      "annual_median_wage": 135630
    },
    "np": {
      "employment": 220,
      "annual_mean_wage": 138430,
      "annual_median_wage": 135160
    }
  },
  "39300": {
    "pa": {
      "employment": 950,
      "annual_mean_wage": 143010,
      "annual_median_wage": 139930
    },
    "np": {
      "employment": 1540,
      "annual_mean_wage": 140860,
      "annual_median_wage": 135520
    }
  },
  "39340": {
    "pa": {
      "employment": 300,
      "annual_mean_wage": 133450,
      "annual_median_wage": 134490
    },
    "np": {
      "employment": 520,
      "annual_mean_wage": 134140,
      "annual_median_wage": 133860
    }
  },
  "39580": {
    "pa": {
      "employment": 1220,
      "annual_mean_wage": 127620,
      "annual_median_wage": 124300
    },
    "np": {
      "employment": 1510,
      "annual_mean_wage": 133570,
      "annual_median_wage": 128150
    }
  },
  "39660": {
    "pa": {
      "employment": 150,
      "annual_mean_wage": 129590,
      "annual_median_wage": 130740
    },
    "np": {
      "employment": 190,
      "annual_mean_wage": 121260,
      "annual_median_wage": 124160
    }
  },
  "39900": {
    "pa": {
      "employment": 300,
      "annual_mean_wage": 124470,
      "annual_median_wage": 134550
    },
    "np": {
      "employment": 420,
      "annual_mean_wage": 134450,
      "annual_median_wage": 137360
    }
  },
  "40060": {
    "pa": {
      "employment": 620,
      "annual_mean_wage": 127600,
      "annual_median_wage": 126810
    },
    "np": {
      "employment": 1440,
      "annual_mean_wage": 123420,
      "annual_median_wage": 127820
    }
  },
  "40140": {
    "pa": {
      "employment": 1020,
      "annual_mean_wage": 160390,
      "annual_median_wage": 165490
    },
    "np": {
      "employment": 1710,
      "annual_mean_wage": 171680,
      "annual_median_wage": 169920
    }
  },
  "40220": {
    "pa": {
      "employment": 360,
      "annual_mean_wage": 136220,
      "annual_median_wage": 135940
    },
    "np": {
      "employment": 440,
      "annual_mean_wage": 126720,
      "annual_median_wage": 134920
    }
  },
  "40340": {
    "pa": {
      "employment": 480,
      "annual_mean_wage": 157160,
      "annual_median_wage": 137340
    },
    "np": {
      "employment": 1190,
      "annual_mean_wage": 119980,
      "annual_median_wage": 126270
    }
  },
  "40380": {
    "pa": {
      "employment": 1230,
      "annual_mean_wage": 132760,
      "annual_median_wage": 130430
    },
    "np": {
      "employment": 1890,
      "annual_mean_wage": 127190,
      "annual_median_wage": 128110
    }
  },
  "40420": {
    "pa": {
      "employment": 60,
      "annual_mean_wage": 128200,
      "annual_median_wage": 127800
    },
    "np": {
      "employment": 240,
      "annual_mean_wage": 124390,
      "annual_median_wage": 127720
    }
  },
  "40900": {
    "pa": {
      "employment": 1070,
      "annual_mean_wage": 155340,
      "annual_median_wage": 161470
    },
    "np": {
      "employment": 1170,
      "annual_mean_wage": 177260,
      "annual_median_wage": 172010
    }
  },
  "41060": {
    "pa": {
      "employment": 170,
      "annual_mean_wage": 134240,
      "annual_median_wage": 132650
    },
    "np": {
      "employment": 240,
      "annual_mean_wage": 132370,
      "annual_median_wage": 131520
    }
  },
  "41100": {
    "pa": {
      "employment": 110,
      "annual_mean_wage": 138770,
      "annual_median_wage": 138110
    },
    "np": {
      "employment": 220,
      "annual_mean_wage": 138500,
      "annual_median_wage": 139590
    }
  },
  "41180": {
    "pa": {
      "employment": 1260,
      "annual_mean_wage": 137450,
      "annual_median_wage": 136120
    },
    "np": {
      "employment": 3430,
      "annual_mean_wage": 135550,
      "annual_median_wage": 131580
    }
  },
  "41420": {
    "pa": {
      "employment": 190,
      "annual_mean_wage": 150890,
      "annual_median_wage": 144190
    },
    "np": {
      "employment": 320,
      "annual_mean_wage": 160440,
      "annual_median_wage": 162600
    }
  },
  "41540": {
    "pa": {
      "employment": 90,
      "annual_mean_wage": 142480,
      "annual_median_wage": 142580
    },
    "np": {
      "employment": 190,
      "annual_mean_wage": 130270,
      "annual_median_wage": 125550
    }
  },
  "41620": {
    "pa": {
      "employment": 810,
      "annual_mean_wage": 131470,
      "annual_median_wage": 130240
    },
    "np": {
      "employment": 1430,
      "annual_mean_wage": 139490,
      "annual_median_wage": 129350
    }
  },
  "41700": {
    "pa": {
      "employment": 650,
      "annual_mean_wage": 144100,
      "annual_median_wage": 140160
    },
    "np": {
      "employment": 1780,
      "annual_mean_wage": 133090,
      "annual_median_wage": 131770
    }
  },
  "41740": {
    "pa": {
      "employment": 1370,
      "annual_mean_wage": 165450,
      "annual_median_wage": 165160
    },
    "np": {
      "employment": 2340,
      "annual_mean_wage": 164870,
      "annual_median_wage": 163860
    }
  },
  "41860": {
    "pa": {
      "employment": 1830,
      "annual_mean_wage": 182610,
      "annual_median_wage": 184380
    },
    "np": {
      "employment": 3110,
      "annual_mean_wage": 215430,
      "annual_median_wage": 219080
    }
  },
  "42140": {
    "pa": {
      "employment": 50,
      "annual_mean_wage": 124160,
      "annual_median_wage": 127730
    },
    "np": {
      "employment": 140,
      "annual_mean_wage": 151520,
      "annual_median_wage": 144250
    }
  },
  "42340": {
    "pa": {
      "employment": 130,
      "annual_mean_wage": 126860,
      "annual_median_wage": 125500
    },
    "np": {
      "employment": 320,
      "annual_mean_wage": 116340,
      "annual_median_wage": 118410
    }
  },
  "42540": {
    "pa": {
      "employment": 310,
      "annual_mean_wage": 126100,
      "annual_median_wage": 126230
    },
    "np": {
      "employment": 430,
      "annual_mean_wage": 121110,
      "annual_median_wage": 126820
    }
  },
  "42660": {
    "pa": {
      "employment": 1920,
      "annual_mean_wage": 170150,
      "annual_median_wage": 167290
    },
    "np": {
      "employment": null,
      "annual_mean_wage": 155120,
      "annual_median_wage": 160090
    }
  },
  "43340": {
    "pa": {
      "employment": 90,
      "annual_mean_wage": 135020,
      "annual_median_wage": 134090
    },
    "np": {
      "employment": 410,
      "annual_mean_wage": 127310,
      "annual_median_wage": 125740
    }
  },
  "43620": {
    "pa": {
      "employment": 290,
      "annual_mean_wage": 132350,
      "annual_median_wage": 135790
    },
    "np": {
      "employment": 500,
      "annual_mean_wage": 127620,
      "annual_median_wage": 130390
    }
  },
  "43780": {
    "pa": {
      "employment": 100,
      "annual_mean_wage": 144020,
      "annual_median_wage": 129620
    },
    "np": {
      "employment": 310,
      "annual_mean_wage": 124210,
      "annual_median_wage": 126220
    }
  },
  "44060": {
    "pa": {
      "employment": 350,
      "annual_mean_wage": 150520,
      "annual_median_wage": 147570
    },
    "np": {
      "employment": 530,
      "annual_mean_wage": 145170,
      "annual_median_wage": 141990
    }
  },
  "44140": {
    "pa": {
      "employment": 320,
      "annual_mean_wage": 148170,
      "annual_median_wage": 161770
    },
    "np": {
      "employment": 530,
      "annual_mean_wage": 141280,
      "annual_median_wage": 138460
    }
  },
  "44180": {
    "pa": {
      "employment": 300,
      "annual_mean_wage": 136330,
      "annual_median_wage": 129270
    },
    "np": {
      "employment": 660,
      "annual_mean_wage": 123890,
      "annual_median_wage": 125630
    }
  },
  "45300": {
    "pa": {
      "employment": 1420,
      "annual_mean_wage": 135210,
      "annual_median_wage": 127820
    },
    "np": {
      "employment": 4180,
      "annual_mean_wage": 127160,
      "annual_median_wage": 128120
    }
  },
  "45820": {
    "pa": {
      "employment": 60,
      "annual_mean_wage": 133330,
      "annual_median_wage": 129800
    },
    "np": {
      "employment": 500,
      "annual_mean_wage": 133600,
      "annual_median_wage": 132740
    }
  },
  "45940": {
    "pa": {
      "employment": 140,
      "annual_mean_wage": 148970,
      "annual_median_wage": 138880
    },
    "np": {
      "employment": 490,
      "annual_mean_wage": 153790,
      "annual_median_wage": 153630
    }
  },
  "46060": {
    "pa": {
      "employment": 290,
      "annual_mean_wage": 145490,
      "annual_median_wage": 129880
    },
    "np": {
      "employment": 820,
      "annual_mean_wage": 136000,
      "annual_median_wage": 129340
    }
  },
  "46140": {
    "pa": {
      "employment": 350,
      "annual_mean_wage": 135490,
      "annual_median_wage": 134380
    },
    "np": {
      "employment": 1090,
      "annual_mean_wage": 138730,
      "annual_median_wage": 139460
    }
  },
  "46300": {
    "pa": {
      "employment": 50,
      "annual_mean_wage": 130370,
      "annual_median_wage": 135010
    },
    "np": {
      "employment": 90,
      "annual_mean_wage": 136480,
      "annual_median_wage": 131640
    }
  },
  "46520": {
    "pa": {
      "employment": 390,
      "annual_mean_wage": 153830,
      "annual_median_wage": 170060
    },
    "np": {
      "employment": 400,
      "annual_mean_wage": 142230,
      "annual_median_wage": 135570
    }
  },
  "47260": {
    "pa": {
      "employment": 780,
      "annual_mean_wage": 129080,
      "annual_median_wage": 126430
    },
    "np": {
      "employment": 1300,
      "annual_mean_wage": 123580,
      "annual_median_wage": 124530
    }
  },
  "47900": {
    "pa": {
      "employment": 3020,
      "annual_mean_wage": 152430,
      "annual_median_wage": 148200
    },
    "np": {
      "employment": 4050,
      "annual_mean_wage": 138570,
      "annual_median_wage": 134840
    }
  },
  "47940": {
    "pa": {
      "employment": 60,
      "annual_mean_wage": 145030,
      "annual_median_wage": 132880
    },
    "np": {
      "employment": 260,
      "annual_mean_wage": 134890,
      "annual_median_wage": 126330
    }
  },
  "48620": {
    "pa": {
      "employment": 240,
      "annual_mean_wage": 121900,
      "annual_median_wage": 121640
    },
    "np": {
      "employment": 690,
      "annual_mean_wage": 127190,
      "annual_median_wage": 116100
    }
  },
  "49340": {
    "pa": {
      "employment": 470,
      "annual_mean_wage": 149490,
      "annual_median_wage": 152860
    },
    "np": {
      "employment": 840,
      "annual_mean_wage": 146500,
      "annual_median_wage": 135120
    }
  }
};

export function advancedPracticeMetroSalary(careerSlug: string, cbsa: string): AdvancedPracticeMetroSalary | undefined { const role = careerSlug === "nurse-practitioner" ? "np" : careerSlug === "physician-assistant" ? "pa" : undefined; return role ? ADVANCED_PRACTICE_METRO_SALARIES[cbsa]?.[role] : undefined; }
