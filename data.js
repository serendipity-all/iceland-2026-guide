const tripData = {
  start: '2026-09-23T00:00:00+00:00',
  days: [
    {
      day: 1, date: '2026-09-23', label: '抵達・藍湖・雷克雅維克', intensity: 'easy', tags:['spa','city'], longDrive:false, aurora:false,
      summary: '15:25 抵達冰島。以藍湖放鬆開場，再進雷克雅維克、寄放行李與城市散步。',
      wear: '排汗長袖＋薄中層＋DryVent 外殼；泡湯衣物獨立防水袋。',
      tips: ['藍湖前先確認預約時段與入場方案。','長途飛行後第一天不要排太滿。','Hallgrímskirkja 若上塔，可視抵達時間與體力彈性。'],
      spots:[
        {id:'blue-lagoon', name:'藍湖溫泉', en:'Blue Lagoon (Bláa Lónið)', type:'spa', lat:63.8804, lng:-22.4495, img:'images/blue_lagoon.jpg', wiki:'Blue_Lagoon_(Iceland)', highlight:'乳藍色地熱海水、黑色熔岩地貌；第一天用來舒緩飛行疲勞很合適。', gear:'泳衣、防水袋、保暖外套（離池後）', caution:'泡湯前後補水；頭髮先抹護髮並盡量避免長時間泡在礦物水中。'},
        {id:'hallgrimskirkja', name:'哈爾格林姆教堂', en:'Hallgrímskirkja', type:'city', lat:64.1417, lng:-21.9266, img:'images/hallgrimskirkja.jpg', wiki:'Hallgrímskirkja', highlight:'雷克雅維克地標，外型取材自冰島玄武岩柱；塔頂城市視野很漂亮。', gear:'防風外套、好走的鞋', caution:'風大時塔頂體感低；開放時間依當日公告。'}
      ]
    },
    {
      day: 2, date: '2026-09-24', label: '南岸經典大滿貫', intensity: 'walk', tags:['nature'], longDrive:true, aurora:false,
      summary: '瀑布、黑沙灘、峽谷、冰河湖與鑽石沙灘，是全程景點密度最高的一天。',
      wear: '防水鞋＋羊毛襪＋DryVent；雨褲放日用包，瀑布與大風時直接套上。',
      tips: ['這天不是高強度健行，但上下車次數多、景點密度很高。','黑沙灘務必遵守現場警示燈與安全線。','冰河湖與鑽石沙灘風通常比想像中冷。'],
      spots:[
        {id:'seljalandsfoss', name:'水簾洞瀑布', en:'Seljalandsfoss', type:'nature', lat:63.6156, lng:-19.9886, img:'images/seljalandsfoss.jpg', wiki:'Seljalandsfoss', highlight:'可從瀑布後方環繞觀看，是冰島最具沉浸感的瀑布之一。', gear:'防水外套、防水褲、防水鞋', caution:'步道濕滑且一定會被水氣噴濕；防水外套、鞋非常有感。'},
        {id:'skogafoss', name:'彩虹瀑布', en:'Skógafoss', type:'nature', lat:63.5321, lng:-19.5114, img:'images/skogafoss.jpg', wiki:'Skógafoss', highlight:'水量大、視野開闊；晴天水霧常形成雙彩虹。', gear:'防水外套、防水鞋；走階梯可帶手套', caution:'若走右側階梯上觀景台，會比平地多一些腿力。'},
        {id:'reynisfjara', name:'黑沙灘', en:'Reynisfjara Black Sand Beach', type:'nature', lat:63.4040, lng:-19.0453, img:'images/reynisfjara.jpg', wiki:'Reynisfjara', highlight:'黑色火山砂、玄武岩柱、海蝕洞與 Reynisdrangar 海蝕柱。', gear:'防風防水外套、防水鞋、毛帽', caution:'最重要：Sneaker waves 瘋狗浪。不要背對海、不要追浪、依現場警示燈行動。'},
        {id:'fjadrargljufur', name:'羽毛峽谷', en:'Fjaðrárgljúfur', type:'nature', lat:63.7713, lng:-18.1718, img:'images/fjadrargljufur.jpg', wiki:'Fjaðrárgljúfur', highlight:'蜿蜒峽谷與苔原景觀，觀景步道本身不算難。', gear:'防風外套、防水鞋；雨天加防水褲', caution:'雨後泥濘、風大；遵守步道封閉範圍保護脆弱植被。'},
        {id:'jokulsarlon', name:'傑古沙龍冰河湖', en:'Jökulsárlón Glacier Lagoon', type:'nature', lat:64.0784, lng:-16.2306, img:'images/jokulsarlon.jpg', wiki:'Jökulsárlón', highlight:'漂浮冰山與冰川潟湖，是這趟最值得慢慢看的景點之一。', gear:'防風外套、保暖中層、毛帽、手套', caution:'岸邊風很強；常有海豹在冰山棲息。'},
        {id:'diamond-beach', name:'鑽石沙灘', en:'Diamond Beach (Breiðamerkursandur)', type:'nature', lat:64.0439, lng:-16.1771, img:'images/diamond_beach.jpg', wiki:'Breiðamerkursandur', highlight:'冰塊被海浪推上黑沙，光線好時像散落的水晶。', gear:'防風外套、防水鞋、毛帽、手套', caution:'同樣屬海岸環境，不靠近浪區；冰塊不要攀爬。'}
      ]
    },
    {
      day: 3, date: '2026-09-25', label: '前往阿克雷里・北部小鎮', intensity: 'longdrive', tags:['city'], longDrive:true, aurora:false,
      summary: '移動到北部核心城市 Akureyri，以小鎮散步和熟悉後續鑽石圈為主。',
      wear: '舒適長褲＋中層；車上採洋蔥式穿法，避免穿太厚。',
      tips: ['依目前行程表，這是明顯長移動日。','建議跟司機確認中途停靠點與用餐安排。'],
      spots:[
        {id:'akureyri', name:'阿克雷里小鎮', en:'Akureyri', type:'city', lat:65.6835, lng:-18.0878, img:'images/akureyri.jpg', wiki:'Akureyri', highlight:'北冰島最大城鎮之一，地標愛心紅綠燈、彩虹步道與 Brynja 冰淇淋。', gear:'防風外套、舒適步行鞋', caution:'傍晚後溫度下降快，晚餐後若還想散步記得帶手套。'}
      ]
    },
    {
      day: 4, date: '2026-09-26', label: '鑽石圈・米湖地熱', intensity: 'walk', tags:['nature'], longDrive:false, aurora:false,
      summary: '眾神瀑布、黛提瀑布、Krafla 火山與 Mývatn 地熱景觀，地貌變化非常大。',
      wear: '防水鞋＋防風外殼；硫磺地熱區以不怕沾氣味的衣物為佳。',
      tips: ['地熱區不要跨越封鎖線，地表可能很薄。','瀑布觀景區碎石與濕滑路面較多。'],
      spots:[
        {id:'godafoss', name:'眾神瀑布', en:'Goðafoss', type:'nature', lat:65.6828, lng:-17.5502, img:'images/godafoss.jpg', wiki:'Goðafoss', highlight:'弧形瀑布群與冰島歷史故事，是北部代表性景觀。', gear:'防風防水外套、防水鞋', caution:'兩岸都有視角，時間有限時依司機建議選一側即可。'},
        {id:'dettifoss', name:'黛提瀑布', en:'Dettifoss', type:'nature', lat:65.8147, lng:-16.3844, img:'images/dettifoss.jpg', wiki:'Dettifoss', highlight:'以全歐最大水流量聞名，現場的聲音與震動感比照片更震撼。', gear:'防風防水外套、防水鞋、毛帽／手套', caution:'水霧、碎石、強風；鞋底抓地力重要。'},
        {id:'krafla', name:'克拉夫拉火山 & Viti火口湖', en:'Krafla Volcano & Viti Crater', type:'nature', lat:65.7170, lng:-16.7540, img:'images/krafla_viti.jpg', wiki:'Krafla', highlight:'火山口、熔岩與地熱活動構成典型北冰島寶藍湖水地景。', gear:'防風外套、防水鞋', caution:'只走開放步道；天氣差時能見度變化快。'},
        {id:'myvatn', name:'米湖 Hverir 地熱區', en:'Hverir Geothermal Area (Mývatn)', type:'nature', lat:65.6039, lng:-17.0000, img:'images/hverir.jpg', wiki:'Hverir', highlight:'湖泊、火山地貌、蒸氣孔與泥漿池集中在很小範圍，如火星表面。', gear:'防風外套、防水鞋', caution:'地熱硫磺味明顯；眼睛敏感可縮短停留。'}
      ]
    },
    {
      day: 5, date: '2026-09-27', label: '西格芙德峽灣・賞鯨', intensity: 'easy', tags:['nature','city'], longDrive:false, aurora:false,
      summary: '前往北部峽灣小鎮並安排賞鯨體驗。出海出船港口體驗。',
      wear: '比陸地多一層：羊毛襪＋保暖中層＋防風外殼；毛帽與手套一定放身上。',
      tips: ['海上體感會顯著低於陸地。','容易暈船者依醫囑提前使用暈船藥。','船公司若提供連身保暖衣，建議穿。'],
      spots:[
        {id:'siglufjordur', name:'峽灣出海賞鯨', en:'Siglufjörður Whale Watching', type:'nature', lat:66.1518, lng:-18.9097, img:'images/whale_watching.jpg', wiki:'Whale_watching', highlight:'北部狹長峽灣出海，經常能近距離看到座頭鯨與小鬚鯨擺尾。', gear:'保暖中層、防風外套、毛帽、手套、羊毛襪；易暈者備暈船用品', caution:'⚑ 出海前 30 分鐘服暈船藥；風浪大時請握緊船欄。'}
      ]
    },
    {
      day: 6, date: '2026-09-28', label: '東部峽灣・Egilsstaðir・等極光', intensity: 'longdrive', tags:['city','aurora'], longDrive:true, aurora:true,
      summary: '移動到東部 Egilsstaðir，沿途以峽灣、拉加爾湖風光為主，晚上開始保留極光時間。',
      wear: '白天車程以舒適分層；晚上追加羽絨、毛帽、手套、保暖底層。',
      tips: ['極光不是固定節目：雲量比 KP 指數更重要。','晚上等極光時「站著不動」會比白天更冷。'],
      spots:[
        {id:'lagarfljot', name:'拉加爾湖', en:'Lagarfljót Lake', type:'nature', lat:65.2674, lng:-14.3948, img:'images/lagarfljot.jpg', wiki:'Lagarfljót', highlight:'東冰島狹長湖泊，傳說棲息著水怪，周圍有罕見的綠色森林。', gear:'白天防風外套；等極光加保暖中層、毛帽、手套', caution:'當晚以天氣與雲量決定是否追極光，不要把固定時間排太滿。'}
      ]
    },
    {
      day: 7, date: '2026-09-29', label: '金字塔山・白日夢小鎮・極光', intensity: 'easy', tags:['nature','city','aurora'], longDrive:false, aurora:true,
      summary: '東部 Búlandstindur 金字塔山＋《白日夢冒險王》彩虹小鎮；晚上追極光。',
      wear: '拍照日：功能衣物為底，外層可選拍照好看的防風外套；晚上再疊羽絨。',
      tips: ['Seyðisfjörður 山路受天候影響較大，交給熟悉當地的司機判斷最合適。'],
      spots:[
        {id:'seydisfjordur', name:'塞濟斯菲厄澤小鎮', en:'Seyðisfjörður', type:'city', lat:65.2609, lng:-14.0090, img:'images/seydisfjordur.jpg', wiki:'Seyðisfjörður', highlight:'彩虹地磚步道、藍色木造教堂與峽灣公路；《白日夢冒險王》滑板場景。', gear:'防風外套、防水鞋', caution:'狹長峽灣地形風速變化快。'},
        {id:'bulandstindur', name:'金字塔山', en:'Búlandstindur', type:'nature', lat:64.6806, lng:-14.3768, img:'images/bulandstindur.jpg', wiki:'Búlandstindur', highlight:'東部 Djúpivogur 附近的金字塔形陡峭玄武岩山體。', gear:'防風外套、防水鞋', caution:'路邊停車拍照注意安全。'}
      ]
    },
    {
      day: 8, date: '2026-09-30', label: '回雷克雅維克・城市休息日', intensity: 'longdrive', tags:['city'], longDrive:true, aurora:false,
      summary: '回到雷克雅維克休息，安排 Sun Voyager 與 Harpa，讓前幾天的自然景觀切換成城市節奏。',
      wear: '城市休閒穿搭即可，但海港風大，外殼仍建議帶著。',
      tips: ['如果移動時間長，城市景點以「有餘裕再逛」為原則。','Harpa 室內很適合當雨備。'],
      spots:[
        {id:'sun-voyager', name:'太陽航行者', en:'Sun Voyager (Sólfar)', type:'city', lat:64.1476, lng:-21.9220, img:'images/sun_voyager.jpg', wiki:'Sun_Voyager', highlight:'海濱不鏽鋼幾何維京船鋼雕，日落、藍調與遠方山景極佳。', gear:'防風外套、毛帽（風大時）', caution:'海邊風勢常比市中心強。'},
        {id:'harpa', name:'Harpa 音樂廳', en:'Harpa Concert Hall', type:'city', lat:64.1500, lng:-21.9326, img:'images/harpa.jpg', wiki:'Harpa_(concert_hall)', highlight:'幾何蜂巢狀彩色玻璃外牆，大太陽與日光折射下極具視覺衝擊美學。', gear:'一般城市穿著即可', caution:'室內設有咖啡廳與紀念品店。'}
      ]
    },
    {
      day: 9, date: '2026-10-01', label: '黃金圈經典一日遊', intensity: 'walk', tags:['nature'], longDrive:false, aurora:false,
      summary: 'Þingvellir、Geysir、Gullfoss、Kerið：冰島地質、歷史與瀑布的經典濃縮版。',
      wear: '防風外殼＋防水鞋；雨褲依降雨決定。',
      tips: ['Geysir 區不要跨越繩線，地熱水極燙。','Gullfoss 水霧＋風容易讓體感驟降。'],
      spots:[
        {id:'thingvellir', name:'辛格韋德利國家公園', en:'Þingvellir National Park', type:'nature', lat:64.2559, lng:-21.1296, img:'images/thingvellir.jpg', wiki:'Þingvellir', highlight:'歐亞與北美板塊大裂谷地貌與冰島古老議會歷史交會。', gear:'防風外套、防水鞋', caution:'步道好走，但風雨天仍需防滑。'},
        {id:'geysir', name:'史托克間歇泉', en:'Strokkur Geysir', type:'nature', lat:64.3104, lng:-20.3024, img:'images/strokkur.jpg', wiki:'Strokkur', highlight:'每 6-10 分鐘規律爆發 20-30 米高沸騰水柱。', gear:'防風外套、防水鞋', caution:'熱泉周圍水溫極高，不離開步道。'},
        {id:'gullfoss', name:'黃金瀑布', en:'Gullfoss Waterfall', type:'nature', lat:64.3271, lng:-20.1199, img:'images/gullfoss.jpg', wiki:'Gullfoss', highlight:'雙層梯級大瀑布傾瀉入 32 米深峽谷，水量與氣勢驚人。', gear:'防風防水外套、防水鞋', caution:'水氣大，護目鏡/眼鏡要常擦。'},
        {id:'kerid', name:'Kerið 火口湖', en:'Kerið Crater Lake', type:'nature', lat:64.0413, lng:-20.8851, img:'images/kerid.jpg', wiki:'Kerið', highlight:'紅褐色火山岩壁與寶石綠水形成鮮明對比。', gear:'防風外套、防水鞋', caution:'繞火口一圈注意邊緣風速。'}
      ]
    },
    {
      day: 10, date: '2026-10-02', label: '天空之鏡溫泉・教堂山（彈性備案）', intensity: 'longdrive', tags:['city','spa','nature','aurora'], longDrive:true, aurora:true,
      summary: '依天氣彈性調度：Sky Lagoon 海景地熱溫泉與 Kirkjufell 教堂山美景。',
      wear: '依當日實際版本切換；若跑 Kirkjufell，仍以防風防水裝備為主。',
      tips: ['Kirkjufell 與雷克雅維克並不在同一區，若當天都做會是長行程。','Sky Lagoon 建議把乾淨換洗衣物單獨打包。'],
      spots:[
        {id:'sky-lagoon', name:'天空之鏡地熱溫泉', en:'Sky Lagoon', type:'spa', lat:64.1176, lng:-21.9290, img:'images/sky_lagoon.jpg', wiki:'Sky_Lagoon', highlight:'面海無邊際地熱池與 7-Step 冰島身體養生儀式。', gear:'泳衣、防水袋、乾淨換洗衣物', caution:'預約制；泡湯後不要把極緊湊的長車程排在後面。'},
        {id:'kirkjufell', name:'教堂山與瀑布', en:'Kirkjufell & Kirkjufellsfoss', type:'nature', lat:64.9417, lng:-23.3069, img:'images/kirkjufell.jpg', wiki:'Kirkjufell', highlight:'獨立草帽角錐山峰與 Kirkjufellsfoss 瀑布組合，為冰島經典攝影神山。', gear:'防風防水外套、防水鞋、毛帽、手套', caution:'⚑ 與 Reykjavik / Sky Lagoon 距離較遠，這天務必依天氣與司機判斷是否成行。'}
      ]
    },
    {
      day: 11, date: '2026-10-03', label: '清晨班機・返程返鄉', intensity: 'easy', tags:['city'], longDrive:false, aurora:false,
      summary: '07:40 清晨飛機，前一晚以收行李、補眠、確認接送為主。',
      wear: '飛行舒適穿搭＋外套放手提行李，不托運。',
      tips: ['前一晚就完成退稅/行李重量整理規劃。','護照、藥品、行動電源與一套換洗衣物留隨身。'],
      spots:[
        {id:'kef', name:'凱夫拉維克國際機場', en:'Keflavík International Airport', type:'city', lat:63.9850, lng:-22.6056, img:'images/blue_lagoon.jpg', wiki:'Keflavík_International_Airport', highlight:'11 天冰島極光驚喜之旅劃下美好句點。', gear:'舒適飛行穿著；外套留隨身', caution:'清晨航班，接送時間務必前一晚確認。'}
      ]
    }
  ],
  packing: {
    carry: [
      '護照、登機資料、信用卡（已開通 4 位數 PIN 碼）與少量現金','手機、耳機、充電線','大容量行動電源（不可托運）','相機、備用電池與穩固腳架','常用／必要常備藥與暈船藥','護唇膏、保濕乳液、面紙、濕紙巾','毛帽、手套或薄保暖層（抵達即可取用）','空水瓶／保溫瓶（安檢後裝水）'
    ],
    cabin: [
      '每人 1–2 天換洗衣物','一雙備用羊毛襪與內著','基本盥洗與保養（液體符合登機規定）','歐規雙腳圓柱轉接頭與充電頭','拭鏡布與重要電子用品','托運延誤時仍會需要的個人物品'
    ],
    checked: [
      '美麗諾羊毛排汗內層 3–4 件','抓絨 Fleece / 輕羽絨保暖中層 2 件','Gore-Tex 防風防水衝鋒外套 1 件','防水防風保暖褲（加刷毛） 2 件','高筒防水登山鞋（黃金大底 Vibram） 1 雙','厚羊毛襪 4–5 雙','簡易瀑布防滑冰爪 1 雙','泳衣/泳褲與防水袋（藍湖 & Sky Lagoon）','防風毛帽、手套、防風圍脖','個人常備藥（感冒、腸胃、高保濕乳液）','高容量保溫瓶 (500ml-1000ml)'
    ],
    shared: [
      '兩件托運行李交叉放夫妻各 1–2 天衣物','共用萬國轉接頭／多孔充電頭','簡易急救藥包與暈船用品','行李 AirTag 追蹤器','拍極光專用相機腳架'
    ]
  }
};
