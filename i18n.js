(function (global) {
  "use strict";

  var LOCALES = [
    { id: "zh-Hans", html: "zh-Hans", dir: "ltr", name: "简体中文", og: "zh_CN" },
    { id: "zh-Hant", html: "zh-Hant", dir: "ltr", name: "繁體中文", og: "zh_TW" },
    { id: "en", html: "en", dir: "ltr", name: "English", og: "en_US" },
    { id: "ja", html: "ja", dir: "ltr", name: "日本語", og: "ja_JP" },
    { id: "ko", html: "ko", dir: "ltr", name: "한국어", og: "ko_KR" },
    { id: "es", html: "es", dir: "ltr", name: "Español", og: "es_ES" },
    { id: "fr", html: "fr", dir: "ltr", name: "Français", og: "fr_FR" },
    { id: "de", html: "de", dir: "ltr", name: "Deutsch", og: "de_DE" },
    { id: "pt-BR", html: "pt-BR", dir: "ltr", name: "Português (Brasil)", og: "pt_BR" },
    { id: "ru", html: "ru", dir: "ltr", name: "Русский", og: "ru_RU" },
    { id: "ar", html: "ar", dir: "rtl", name: "العربية", og: "ar_SA" },
    { id: "hi", html: "hi", dir: "ltr", name: "हिन्दी", og: "hi_IN" },
    { id: "id", html: "id", dir: "ltr", name: "Bahasa Indonesia", og: "id_ID" }
  ];

  var LINKS = {
    appleSubscriptions: "https://apps.apple.com/account/subscriptions",
    appleCancelHelp: "https://support.apple.com/HT202039",
    appleRefund: "https://reportaproblem.apple.com/",
    appleRefundHelp: "https://support.apple.com/HT204084",
    appleEula: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/",
    intendedStore: "https://apps.apple.com/app/id6812138730",
    email: "mailto:weizhichao1027@gmail.com",
    site: "https://weizhichao1027-collab.github.io/rizi-site/"
  };

  function ruCategory(n) {
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return "one";
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "few";
    return "many";
  }

  function arCategory(n) {
    if (n === 0) return "zero";
    if (n === 1) return "one";
    if (n === 2) return "two";
    var mod100 = n % 100;
    if (mod100 >= 3 && mod100 <= 10) return "few";
    if (mod100 >= 11) return "many";
    return "other";
  }

  function pickForm(forms, n, locale) {
    var key = "other";
    if (locale === "ru") key = ruCategory(n);
    else if (locale === "ar") key = arCategory(n);
    else if (n === 1 && forms.one) key = "one";
    return forms[key] || forms.other || String(n);
  }

  var T = {};

  function fill(locale, dict) {
    T[locale] = dict;
  }

  fill("zh-Hans", {
    skip: "跳到正文",
    menu: "菜单",
    navHome: "官网",
    navCounts: "天数",
    navThemes: "主题",
    navSupport: "技术支持",
    navPrivacy: "隐私政策",
    language: "语言",
    comingStore: "即将上架 App Store",
    writeDev: "写信给开发者",
    copyright: "© 2026 日子 / Days",
    homeTitle: "日子: 还剩几天",
    homeDesc: "日子帮你为考试、恋爱、旅行、生日做倒数。两步添加，大号天数，主题可先预览。基础免费，Pro 一次买断。不收集个人数据。",
    heroTitle: "还剩几天",
    heroLede: "给考试、恋爱、旅行、生日做倒数。写下名称，选一个日期。列表、详情和小组件用同一套天数。",
    browseThemes: "先看主题",
    countsTitle: "三种说法，同一口径",
    countsLead: "按自然日计算，不按小时。今天、还没到、已经过去，各只有一句。",
    countsFuture: "日期还在后面。列表副标题、详情大字、主屏幕和锁屏小组件都写这一句。",
    countsPast: "日期已经过去。不会另算一套，也不会和小组件各写各的。",
    themesTitle: "颜色主题，可先预览",
    themeNote: "点卡片只预览，点「使用」才写入。朱砂赤色、琥珀橙色免费；胭脂粉色、青瓷绿色、秋茶金色、群青蓝色需解锁 Pro。",
    addTitle: "两步就够",
    addLede: "不用学用法。打开日子，写下这件事叫什么，再选那天。保存之后，天数会自己走。",
    fieldName: "名称",
    fieldDate: "日期",
    localTitle: "数据只在这台 iPhone 上",
    localBody: "没有账号，没有云同步，没有社交。日子不收集个人数据，也不需要相机、相册或系统日历。卸载 App，这些日子会一起删除。",
    price: "Pro 一次买断",
    priceNote: "中文商店价为 ¥6。解锁全部颜色主题，不是订阅。付款由 Apple 处理。其他地区显示当地价格。",
    getTitle: "iPhone 上的日子",
    getBody: "需要 iOS 17 或更新系统。主屏幕小号、中号、大号，以及锁屏圆形、方形、一行，都可以放日子。小组件默认跟着最近的一条，也可以指定某一条。最多 500 个日子。",
    sceneExam: "期末考试",
    sceneBirthday: "生日派对",
    sceneLove: "恋爱纪念日",
    sceneTravel: "旅行出发",
    sceneJob: "入职倒计时",
    sceneGrad: "毕业季",
    today: "就是今天",
    remaining: { other: "还剩 {n} 天" },
    past: { other: "已过 {n} 天" },
    privacyTitle: "日子 / Days 隐私政策",
    privacyDesc: "日子不收集个人数据。数据保存在本机；Pro 购买由 Apple 处理。",
    privacyH1: "隐私政策",
    privacyLede: "日子在你的设备上运行，无需注册账号。我们不收集、不出售、不共享个人数据。",
    privacyUpdated: "最后更新: 2026年9月16日",
    factPersonal: "个人数据",
    factPersonalV: "不收集",
    factAccount: "账号",
    factAccountV: "不需要",
    factTrack: "追踪",
    factTrackV: "无",
    factStorage: "保存位置",
    factStorageV: "仅本机",
    tocCollect: "收集哪些数据",
    tocLocal: "本机内容",
    tocBackup: "本机备份",
    tocPermissions: "权限",
    tocPurchases: "购买",
    tocRetention: "保存多久",
    tocChildren: "儿童",
    tocThird: "第三方",
    tocSite: "本网站",
    tocRegion: "地区说明",
    tocChanges: "政策变更",
    tocContact: "联系",
    pCollectH: "我们收集哪些数据",
    pCollect: "我们不收集个人数据。App 不接入分析、广告、崩溃上报或人工智能接口，也不会读取广告标识符（IDFA），不弹出追踪许可。",
    pLocalH: "仅保存在你设备上的内容",
    pLocal1: "你添加的日子：名称、日期、主题、创建时间和一条本地标识",
    pLocal2: "主题与显示偏好",
    pLocal3: "是否已解锁 Pro（先向 Apple 查询购买状态，再在本机记下结果，供小组件使用）",
    pLocal4: "本机快照：保存时留下的可用备份，以及文件损坏时的副本",
    pLocalP: "这些写在设备本地，包括小组件所用的 App Group 文件和同一组的 UserDefaults。最多保存 500 个日子。小组件只读取已经保存在这台设备上的日子。",
    pBackupH: "本机备份，不是云同步",
    pBackup: "日子没有自己的云同步，也不使用 iCloud Drive 或 CloudKit。每次保存时，App 会在同一台设备上留下最多两份可用快照；文件损坏时也可能留下副本。设置里的「数据备份」可以恢复最近一份可读快照，并覆盖当前列表。这不是换机迁移。若你开启了系统备份（如 iCloud 备份或电脑备份），备份里可能包含日子名称与日期。",
    pPermH: "权限",
    pPerm: "日子不请求、也不需要相机、相册、麦克风、定位、通讯录、系统日历、通知或追踪权限。Info.plist 里没有这些用途说明，因为 App 不会调用它们。桌面与锁屏小组件只读本机已保存的日子。",
    pApiH: "系统接口",
    pApi: "为了在本机读写日子列表、和小组件共享数据、以及留下本地快照，App 会使用 UserDefaults，并读取文件时间戳。这些访问只发生在你的设备上，不会用来追踪你。",
    pBuyH: "购买",
    pBuy: "可选的 Pro 解锁由 Apple 的 App 内购买处理。商品 ID 为 com.rizi.pro.themes，类型为非消耗型买断，不是订阅，也没有订阅组。App Store 已开启家人共享，购买者可与家庭成员共享此买断。付款信息由 Apple 处理，我们收不到银行卡号。我们只从 Apple 获知该商品是否已购买、是否被退款或撤销。退款后 Pro 会收回。家庭批准购买可能显示为等待批准，这不是失败。",
    pKeepH: "保存多久",
    pKeep: "日子数据一直留在这台设备上，直到你删除某条日子、在设置里用备份覆盖列表，或卸载 App。卸载后本地文件和快照会一起删除。我们没有服务器副本，因此无法替你远程删除。系统备份里的副本，按 Apple 的备份与设备管理处理。",
    pChildH: "儿童",
    pChild: "App 分级为 4+。我们不以儿童为对象收集数据，也不故意收集 13 岁以下（或你所在地区规定的更高年龄）任何人的个人数据。因为我们不收集个人数据，也没有需要监护人同意的在线账户。",
    pThirdH: "第三方",
    pThird: "除 Apple（App Store / StoreKit）外，App 不向第三方发送你的日子数据。没有分析 SDK、广告 SDK、登录服务或人工智能接口。使用条款使用 Apple 标准最终用户许可协议。",
    pSiteH: "本网站",
    pSite: "本页说明的是「日子」iOS App。网站为静态页面，托管于 GitHub Pages；访问时托管方可能记录常规服务器日志（例如 IP 与浏览器）。本站用 localStorage 记住你选择的语言，不使用 Cookie，不加载分析或广告脚本，也不加载第三方字体。语言选择可在浏览器中清除。",
    pRegionH: "地区说明",
    pRegion: "我们不把日子数据发送到自己的服务器，因此不存在由我们发起的跨境传输。Apple 处理购买时，适用 Apple 的隐私政策与所在地区的付款规则。欧洲经济区、英国或加州用户：我们不出售、不共享个人数据用于广告或跨应用追踪。如需行使访问或删除权，请先在 App 内删除日子或卸载 App，再写信到下方邮箱。我们无法提供服务器上的副本，因为没有。中国大陆用户：我们不收集个人信息，也不向境外传输你的日子内容。",
    pChangeH: "政策变更",
    pChange: "若本政策变更，我们会更新上方日期，并在本页面发布新版本。",
    pContactH: "联系",
    pContact: "隐私相关问题请写信。日子 / Days 是 iOS 倒数日与纪念日工具。开发者: Zhichao Wei。运营者没有单独的公司服务器收集你的数据。",
    supportTitle: "日子: 技术支持",
    supportDesc: "日子 App 技术支持与常见问题。添加日子、天数口径、小组件、主题、买断与恢复购买。",
    supportH1: "技术支持",
    supportLede: "使用或购买遇到问题，先看下面的问答。仍未解决，把现象写信发给我们。",
    tocAdd: "怎么添加",
    tocCount: "天数怎么算",
    tocWidget: "小组件对不上",
    tocTheme: "主题不能用",
    tocPurchase: "购买失败",
    tocRestore: "恢复购买",
    tocBackup: "本机备份",
    tocSubscribe: "是不是订阅",
    tocRefund: "退款",
    tocPrivacy: "收不收集数据",
    tocBug: "报告问题",
    sAddH: "怎么添加日子？",
    sAdd: "打开 App，点「添加日子」，填写名称并选择日期，然后保存。只需这两步。空列表时首页有入口，之后也可以用右上角加号。名称最多 80 个字符。最多 500 个日子；满了需要先删除再添加。",
    sCountH: "「就是今天 / 还剩 N 天 / 已过 N 天」怎么算？",
    sCount: "按自然日计算，不按小时。列表、详情、主屏幕和锁屏小组件走同一套口径。",
    sWidgetH: "小组件天数怎么和 App 里对不上？",
    sWidget: "在主屏幕或锁屏长按空白处，点加号或「自定」，搜索「日子」或 Days，选一个尺寸后添加。可以让它自动跟最近的日子，也可以长按小组件后指定某一条。添加后应与详情一致。若刚改过日期，稍等刷新，或离开桌面再回来看。若提示小组件共享空间不可用，日子仍保存在 App 里，但小组件可能读不到。",
    sThemeH: "主题只能预览不能用？",
    sTheme: "免费主题（朱砂赤色、琥珀橙色）点「使用」即可。带锁的主题（胭脂粉色、青瓷绿色、秋茶金色、群青蓝色）需要解锁 Pro。点卡片只预览，不会改掉当前主题；点「使用」才会写入。若尚未购买，点「使用」会进入购买。关掉面板且没点「使用」会回到原来的主题。",
    sPurchaseH: "购买没成功，或提示失败？",
    sPurchase: "确认网络正常，用你的 Apple ID 完成系统购买框。若点了取消，会提示「已取消」。真正失败可以再试一次。若显示等待家人批准，请让家庭组织者在其设备上处理，这不是失败。仍不行时：在 App Store 退出后重新登录，或稍后再试。",
    sRestoreH: "换机或重装后主题没了？",
    sRestore: "打开日子，进入设置或「升级 Pro」，点「恢复购买」。需要使用购买时的同一个 Apple ID。日子本身只保存在这台设备上，换机不会自动带过来；请自己重新添加日子。Pro 解锁可以恢复。",
    sBackupH: "设置里的数据备份是什么？",
    sBackup: "这是本机快照，不是 iCloud 同步。保存日子时会留下可用备份；文件损坏时也会留下副本。点「恢复此备份」会覆盖当前日子列表。换机后请重新添加日子，并用「恢复购买」找回 Pro。",
    sSubH: "会不会要订阅？",
    sSub: "不会。Pro 商品 ID 为 com.rizi.pro.themes，是一次买断（非消耗型），不是订阅，没有续费，也没有自动扣款。中文商店价为 ¥6；其他地区显示当地价格。日子没有可取消的订阅，请不要在 Apple 的「订阅」列表里找日子来取消。",
    sSubManage: "打开 Apple 订阅管理",
    sSubHelp: "阅读 Apple 官方说明",
    sRefundH: "怎么申请退款？",
    sRefund: "付款由 Apple 处理。退款请使用 Apple 的「报告问题」，或查看 Apple 支持里的退款说明。退款生效后，Pro 会锁定，已写入的 Pro 主题会收成免费的朱砂赤色。",
    sRefundLink: "向 Apple 报告问题",
    sRefundHelp: "Apple 退款说明",
    sPrivacyH: "收不收集我的数据？要日历权限吗？",
    sPrivacy: "不收集个人数据。日子与主题保存在本机，不需要相机、相册、通知或系统日历权限。使用条款使用 Apple 标准许可协议。详见隐私政策。",
    sPrivacyLink: "打开隐私政策",
    sEulaLink: "Apple 标准使用条款",
    sBugH: "怎么报告问题？",
    sBug: "写信到下方邮箱，主题写「日子 问题」或 Days bug。请附带：iPhone 型号、iOS 版本、问题现象、能否复现，以及截图（如有）。不要发送 Apple ID 密码或付款卡号。",
    sContactH: "还是不行",
    sContact: "开发者: Zhichao Wei。我们会阅读每一封关于日子的来信。",
    missingTitle: "日子: 没有这一页",
    missingH1: "没有这一页",
    missingLede: "链接可能写错了。回到官网，或去技术支持和隐私政策。",
    backHome: "回到官网"
  });

  fill("zh-Hant", {
    skip: "跳到正文",
    menu: "選單",
    navHome: "官網",
    navCounts: "天數",
    navThemes: "主題",
    navSupport: "技術支援",
    navPrivacy: "隱私權政策",
    language: "語言",
    comingStore: "即將上架 App Store",
    writeDev: "寫信給開發者",
    copyright: "© 2026 日子 / Days",
    homeTitle: "日子: 還剩幾天",
    homeDesc: "日子幫你為考試、戀愛、旅行、生日做倒數。兩步新增，大號天數，主題可先預覽。基礎免費，Pro 一次買斷。不收集個人資料。",
    heroTitle: "還剩幾天",
    heroLede: "給考試、戀愛、旅行、生日做倒數。寫下名稱，選一個日期。列表、詳情和小組件用同一套天數。",
    browseThemes: "先看主題",
    countsTitle: "三種說法，同一口徑",
    countsLead: "按自然日計算，不按小時。今天、還沒到、已經過去，各只有一句。",
    countsFuture: "日期還在後面。列表副標題、詳情大字、主畫面和鎖定畫面小組件都寫這一句。",
    countsPast: "日期已經過去。不會另算一套，也不會和小組件各寫各的。",
    themesTitle: "顏色主題，可先預覽",
    themeNote: "點卡片只預覽，點「使用」才寫入。朱砂赤色、琥珀橙色免費；胭脂粉色、青瓷綠色、秋茶金色、群青藍色需解鎖 Pro。",
    addTitle: "兩步就夠",
    addLede: "不用學用法。打開日子，寫下這件事叫什麼，再選那天。儲存之後，天數會自己走。",
    fieldName: "名稱",
    fieldDate: "日期",
    localTitle: "資料只在這台 iPhone 上",
    localBody: "沒有帳號，沒有雲端同步，沒有社交。日子不收集個人資料，也不需要相機、相簿或系統日曆。卸載 App，這些日子會一起刪除。",
    price: "Pro 一次買斷",
    priceNote: "解鎖全部顏色主題，不是訂閱。付款由 Apple 處理。價格以 App Store 當地標價為準。",
    getTitle: "iPhone 上的日子",
    getBody: "需要 iOS 17 或更新系統。主畫面小、中、大，以及鎖定畫面圓形、方形、一行，都可以放日子。小組件預設跟著最近的一條，也可以指定某一條。最多 500 個日子。",
    sceneExam: "期末考試",
    sceneBirthday: "生日派對",
    sceneLove: "戀愛紀念日",
    sceneTravel: "旅行出發",
    sceneJob: "入職倒數",
    sceneGrad: "畢業季",
    today: "就是今天",
    remaining: { other: "還剩 {n} 天" },
    past: { other: "已過 {n} 天" },
    privacyTitle: "日子 / Days 隱私權政策",
    privacyDesc: "日子不收集個人資料。資料保存在本機；Pro 購買由 Apple 處理。",
    privacyH1: "隱私權政策",
    privacyLede: "日子在你的裝置上執行，無需註冊帳號。我們不收集、不出售、不共享個人資料。",
    privacyUpdated: "最後更新: 2026年9月16日",
    factPersonal: "個人資料",
    factPersonalV: "不收集",
    factAccount: "帳號",
    factAccountV: "不需要",
    factTrack: "追蹤",
    factTrackV: "無",
    factStorage: "儲存位置",
    factStorageV: "僅本機",
    tocCollect: "收集哪些資料",
    tocLocal: "本機內容",
    tocBackup: "本機備份",
    tocPermissions: "權限",
    tocPurchases: "購買",
    tocRetention: "保存多久",
    tocChildren: "兒童",
    tocThird: "第三方",
    tocSite: "本網站",
    tocRegion: "地區說明",
    tocChanges: "政策變更",
    tocContact: "聯絡",
    pCollectH: "我們收集哪些資料",
    pCollect: "我們不收集個人資料。App 不接入分析、廣告、當機回報或人工智慧介面，也不會讀取廣告識別碼（IDFA），不彈出追蹤許可。",
    pLocalH: "僅保存在你裝置上的內容",
    pLocal1: "你新增的日子：名稱、日期、主題、建立時間和一條本機識別",
    pLocal2: "主題與顯示偏好",
    pLocal3: "是否已解鎖 Pro（先向 Apple 查詢購買狀態，再在本機記下結果，供小組件使用）",
    pLocal4: "本機快照：儲存時留下的可用備份，以及檔案損壞時的副本",
    pLocalP: "這些寫在裝置本機，包括小組件所用的 App Group 檔案和同一組的 UserDefaults。最多儲存 500 個日子。小組件只讀取已經保存在這台裝置上的日子。",
    pBackupH: "本機備份，不是雲端同步",
    pBackup: "日子沒有自己的雲端同步，也不使用 iCloud Drive 或 CloudKit。每次儲存時，App 會在同一台裝置上留下最多兩份可用快照；檔案損壞時也可能留下副本。設定裡的「資料備份」可以恢復最近一份可讀快照，並覆蓋目前列表。這不是換機遷移。若你開啟了系統備份（如 iCloud 備份或電腦備份），備份裡可能包含日子名稱與日期。",
    pPermH: "權限",
    pPerm: "日子不請求、也不需要相機、相簿、麥克風、定位、通訊錄、系統日曆、通知或追蹤權限。Info.plist 裡沒有這些用途說明，因為 App 不會呼叫它們。主畫面與鎖定畫面小組件只讀本機已儲存的日子。",
    pApiH: "系統介面",
    pApi: "為了在本機讀寫日子列表、和小組件共享資料、以及留下本機快照，App 會使用 UserDefaults，並讀取檔案時間戳。這些存取只發生在你的裝置上，不會用來追蹤你。",
    pBuyH: "購買",
    pBuy: "可選的 Pro 解鎖由 Apple 的 App 內購買處理。商品 ID 為 com.rizi.pro.themes，類型為非消耗型買斷，不是訂閱，也沒有訂閱群組。App Store 已開啟家人共享，購買者可與家庭成員共享此買斷。付款資料由 Apple 處理，我們收不到銀行卡號。我們只從 Apple 得知該商品是否已購買、是否被退款或撤銷。退款後 Pro 會收回。家庭核准購買可能顯示為等待核准，這不是失敗。",
    pKeepH: "保存多久",
    pKeep: "日子資料一直留在這台裝置上，直到你刪除某條日子、在設定裡用備份覆蓋列表，或卸載 App。卸載後本機檔案和快照會一起刪除。我們沒有伺服器副本，因此無法替你遠端刪除。系統備份裡的副本，按 Apple 的備份與裝置管理處理。",
    pChildH: "兒童",
    pChild: "App 分級為 4+。我們不以兒童為對象收集資料，也不故意收集 13 歲以下（或你所在地區規定的更高年齡）任何人的個人資料。因為我們不收集個人資料，也沒有需要監護人同意的線上帳戶。",
    pThirdH: "第三方",
    pThird: "除 Apple（App Store / StoreKit）外，App 不向第三方傳送你的日子資料。沒有分析 SDK、廣告 SDK、登入服務或人工智慧介面。使用條款使用 Apple 標準最終使用者授權合約。",
    pSiteH: "本網站",
    pSite: "本頁說明的是「日子」iOS App。網站為靜態頁面，托管於 GitHub Pages；造訪時托管方可能記錄一般伺服器日誌（例如 IP 與瀏覽器）。本站用 localStorage 記住你選擇的語言，不使用 Cookie，不載入分析或廣告指令碼，也不載入第三方字型。語言選擇可在瀏覽器中清除。",
    pRegionH: "地區說明",
    pRegion: "我們不把日子資料發送到自己的伺服器，因此不存在由我們發起的跨境傳輸。Apple 處理購買時，適用 Apple 的隱私權政策與所在地區的付款規則。歐洲經濟區、英國或加州使用者：我們不出售、不共享個人資料用於廣告或跨 App 追蹤。如需行使存取或刪除權，請先在 App 內刪除日子或卸載 App，再寫信到下方信箱。我們無法提供伺服器上的副本，因為沒有。",
    pChangeH: "政策變更",
    pChange: "若本政策變更，我們會更新上方日期，並在本頁面發布新版本。",
    pContactH: "聯絡",
    pContact: "隱私相關問題請寫信。日子 / Days 是 iOS 倒數日與紀念日工具。開發者: Zhichao Wei。營運者沒有單獨的公司伺服器收集你的資料。",
    supportTitle: "日子: 技術支援",
    supportDesc: "日子 App 技術支援與常見問題。新增日子、天數口徑、小組件、主題、買斷與回復購買。",
    supportH1: "技術支援",
    supportLede: "使用或購買遇到問題，先看下面的問答。仍未解決，把現象寫信寄給我們。",
    tocAdd: "怎麼新增",
    tocCount: "天數怎麼算",
    tocWidget: "小組件對不上",
    tocTheme: "主題不能用",
    tocPurchase: "購買失敗",
    tocRestore: "回復購買",
    tocBackup: "本機備份",
    tocSubscribe: "是不是訂閱",
    tocRefund: "退款",
    tocPrivacy: "收不收集資料",
    tocBug: "回報問題",
    sAddH: "怎麼新增日子？",
    sAdd: "打開 App，點「新增日子」，填寫名稱並選擇日期，然後儲存。只需這兩步。空列表時首頁有入口，之後也可以用右上角加號。名稱最多 80 個字元。最多 500 個日子；滿了需要先刪除再新增。",
    sCountH: "「就是今天 / 還剩 N 天 / 已過 N 天」怎麼算？",
    sCount: "按自然日計算，不按小時。列表、詳情、主畫面和鎖定畫面小組件走同一套口徑。",
    sWidgetH: "小組件天數怎麼和 App 裡對不上？",
    sWidget: "在主畫面或鎖定畫面長按空白處，點加號或「自訂」，搜尋「日子」或 Days，選一個尺寸後加入。可以讓它自動跟最近的日子，也可以長按小組件後指定某一條。加入後應與詳情一致。若剛改過日期，稍等重新整理，或離開桌面再回來看。若提示小組件共享空間不可用，日子仍保存在 App 裡，但小組件可能讀不到。",
    sThemeH: "主題只能預覽不能用？",
    sTheme: "免費主題（朱砂赤色、琥珀橙色）點「使用」即可。帶鎖的主題（胭脂粉色、青瓷綠色、秋茶金色、群青藍色）需要解鎖 Pro。點卡片只預覽；點「使用」才會寫入。若尚未購買，點「使用」會進入購買。關掉面板且沒點「使用」會回到原來的主題。",
    sPurchaseH: "購買沒成功，或提示失敗？",
    sPurchase: "確認網路正常，用你的 Apple ID 完成系統購買框。若點了取消，會提示「已取消」。真正失敗可以再試一次。若顯示等待家人核准，請讓家庭組織者在其裝置上處理，這不是失敗。仍不行時：在 App Store 退出後重新登入，或稍後再試。",
    sRestoreH: "換機或重裝後主題沒了？",
    sRestore: "打開日子，進入設定或「升級 Pro」，點「回復購買」。需要使用購買時的同一個 Apple ID。日子本身只保存在這台裝置上，換機不會自動帶過來；請自己重新新增日子。Pro 解鎖可以回復。",
    sBackupH: "設定裡的資料備份是什麼？",
    sBackup: "這是本機快照，不是 iCloud 同步。儲存日子時會留下可用備份；檔案損壞時也會留下副本。點「還原此備份」會覆蓋目前日子列表。換機後請重新新增日子，並用「回復購買」找回 Pro。",
    sSubH: "會不會要訂閱？怎麼取消訂閱？",
    sSub: "不會。Pro 是一次買斷（非消耗型），不是訂閱，沒有續費，也沒有自動扣款。日子沒有可取消的訂閱。若你在 Apple 帳戶裡看到其他 App 的訂閱，請走 Apple 官方路徑：iPhone 打開設定，輕點你的姓名，再打開「訂閱」；或在 Safari 打開 Apple 訂閱管理。說明頁見 Apple 支援「檢視、更改或取消訂閱」。",
    sSubManage: "打開 Apple 訂閱管理",
    sSubHelp: "閱讀 Apple 官方說明",
    sRefundH: "怎麼申請退款？",
    sRefund: "付款由 Apple 處理。退款請使用 Apple 的「回報問題」，或查看 Apple 支援裡的退款說明。退款生效後，Pro 會鎖定，已寫入的 Pro 主題會收成免費的朱砂赤色。",
    sRefundLink: "向 Apple 回報問題",
    sRefundHelp: "Apple 退款說明",
    sPrivacyH: "收不收集我的資料？要日曆權限嗎？",
    sPrivacy: "不收集個人資料。日子與主題保存在本機，不需要相機、相簿、通知或系統日曆權限。使用條款使用 Apple 標準授權合約。詳見隱私權政策。",
    sPrivacyLink: "打開隱私權政策",
    sEulaLink: "Apple 標準使用條款",
    sBugH: "怎麼回報問題？",
    sBug: "寫信到下方信箱，主旨寫「日子 問題」或 Days bug。請附帶：iPhone 型號、iOS 版本、問題現象、能否重現，以及截圖（如有）。不要傳送 Apple ID 密碼或付款卡號。",
    sContactH: "還是不行",
    sContact: "開發者: Zhichao Wei。我們會閱讀每一封關於日子的來信。",
    missingTitle: "日子: 沒有這一頁",
    missingH1: "沒有這一頁",
    missingLede: "連結可能寫錯了。回到官網，或去技術支援和隱私權政策。",
    backHome: "回到官網"
  });

  fill("en", {
    skip: "Skip to content",
    menu: "Menu",
    navHome: "Home",
    navCounts: "Counts",
    navThemes: "Themes",
    navSupport: "Support",
    navPrivacy: "Privacy",
    language: "Language",
    comingStore: "Coming to the App Store",
    writeDev: "Email the developer",
    copyright: "© 2026 日子 / Days",
    homeTitle: "Days: how many are left",
    homeDesc: "Days helps you count down to exams, anniversaries, trips, and birthdays. Add in two steps, preview themes, and keep widgets in sync. Core tools are free. Pro is a one-time unlock. We do not collect personal data.",
    heroTitle: "Days left",
    heroLede: "Count down to exams, anniversaries, trips, and birthdays. Name plus date is enough. The list, detail view, and widgets share one count.",
    browseThemes: "Browse themes",
    countsTitle: "Three phrases, one calendar day",
    countsLead: "Counted by calendar day, not by the hour. Today, still ahead, and already past each get one phrase.",
    countsFuture: "The date is still ahead. The list, the large detail type, and Home Screen or Lock Screen widgets all use this line.",
    countsPast: "The date has passed. There is no second formula, and the widget will not drift from the app.",
    themesTitle: "Color themes you can preview",
    themeNote: "Tap a card to preview. Tap Use to apply it. Cinnabar Red and Amber Orange are free. Rouge Pink, Celadon Green, Tea Gold, and Ultramarine need Pro.",
    addTitle: "Two fields",
    addLede: "Nothing to learn. Open Days, name the occasion, pick the date, and save. The count moves on its own.",
    fieldName: "Name",
    fieldDate: "Date",
    localTitle: "On this iPhone only",
    localBody: "No account, no cloud sync, no social graph. Days does not collect personal data, and does not need the camera, photo library, or system calendar. Delete the app, and the days go with it.",
    price: "Pro, one time",
    priceNote: "Unlock every color theme. Not a subscription. Apple handles payment. The price is local in the App Store.",
    getTitle: "Days on iPhone",
    getBody: "Requires iOS 17 or later. Small, medium, and large Home Screen widgets, plus circular, rectangular, and inline Lock Screen widgets, all read the same count. A widget can follow the nearest day, or pin one you choose. The library holds up to 500 days.",
    sceneExam: "Final exam",
    sceneBirthday: "Birthday party",
    sceneLove: "Anniversary",
    sceneTravel: "Trip departure",
    sceneJob: "First day at work",
    sceneGrad: "Graduation",
    today: "Today",
    remaining: { one: "1 day left", other: "{n} days left" },
    past: { one: "1 day ago", other: "{n} days ago" },
    privacyTitle: "Days privacy policy",
    privacyDesc: "Days does not collect personal data. Data stays on device. Apple handles Pro purchases.",
    privacyH1: "Privacy policy",
    privacyLede: "Days runs on your device and does not require an account. We do not collect, sell, or share personal data.",
    privacyUpdated: "Last updated: 16 September 2026",
    factPersonal: "Personal data",
    factPersonalV: "Not collected",
    factAccount: "Account",
    factAccountV: "Not required",
    factTrack: "Tracking",
    factTrackV: "None",
    factStorage: "Storage",
    factStorageV: "On device",
    tocCollect: "Data we collect",
    tocLocal: "On your device",
    tocBackup: "Local backups",
    tocPermissions: "Permissions",
    tocPurchases: "Purchases",
    tocRetention: "Retention",
    tocChildren: "Children",
    tocThird: "Third parties",
    tocSite: "This website",
    tocRegion: "Region notes",
    tocChanges: "Changes",
    tocContact: "Contact",
    pCollectH: "Data we collect",
    pCollect: "We do not collect personal data. The app does not include analytics, advertising, crash-reporting, or AI APIs. It does not read the advertising identifier (IDFA) and does not show an App Tracking Transparency prompt.",
    pLocalH: "Stored only on your device",
    pLocal1: "Days you add: name, date, theme, created time, and a local identifier",
    pLocal2: "Theme and display preferences",
    pLocal3: "Whether Pro is unlocked (queried from Apple, then cached on device for widgets)",
    pLocal4: "Local snapshots: a usable copy saved with your library, and a copy kept if a file is damaged",
    pLocalP: "This stays on device, including the App Group file and UserDefaults suite used by widgets. The library holds up to 500 days. Widgets only read days already saved on this device.",
    pBackupH: "Local backups, not cloud sync",
    pBackup: "Days has no cloud sync of its own and does not use iCloud Drive or CloudKit. Each save can keep up to two readable snapshots on the same device. Damaged files may also leave a copy. Settings > Data backup can restore the newest readable snapshot and replace the current list. That is not a move to a new phone. If you use system backups (such as iCloud Backup or a computer backup), those backups may include day names and dates.",
    pPermH: "Permissions",
    pPerm: "Days does not request camera, photo library, microphone, location, contacts, system calendar, notifications, or tracking access. Info.plist has no usage strings for those APIs because the app does not call them. Home Screen and Lock Screen widgets only read days already saved on this device.",
    pApiH: "System APIs",
    pApi: "To read and write the library on device, share it with widgets, and keep local snapshots, the app uses UserDefaults and file timestamps. These calls stay on your device and are not used to track you.",
    pBuyH: "Purchases",
    pBuy: "Optional Pro unlocks are handled by Apple In-App Purchase. Product ID com.rizi.pro.themes is a non-consumable, one-time unlock. It is not a subscription and there is no subscription group. Family Sharing is on, so the purchaser can share this one-time unlock with their family group. Apple processes payment; we never receive your card details. We only learn from Apple whether that product was purchased, refunded, or revoked. A refund locks Pro again. Ask to Buy may show as waiting for approval. That is not a failure.",
    pKeepH: "How long we keep data",
    pKeep: "Day data stays on this device until you delete a day, restore a local backup over the current list, or delete the app. Deleting the app removes the local files and snapshots. We have no server copy, so we cannot delete it remotely. Copies inside system backups follow Apple’s backup and device controls.",
    pChildH: "Children",
    pChild: "The app is rated 4+. We do not target children and do not knowingly collect personal data from anyone under 13, or the higher age set by your region. Because we do not collect personal data, there is no online account that needs guardian consent.",
    pThirdH: "Third parties",
    pThird: "Except Apple (App Store / StoreKit), the app does not send your day data to third parties. There is no analytics SDK, ad SDK, sign-in service, or AI API. Terms of Use are Apple’s standard EULA.",
    pSiteH: "This website",
    pSite: "This policy covers the Days iOS app. The site is static and hosted on GitHub Pages. The host may keep ordinary server logs, such as IP address and browser. The site stores your language choice in localStorage. It does not use cookies, analytics, ads, or third-party fonts. You can clear the language choice in the browser.",
    pRegionH: "Region notes",
    pRegion: "We do not send day data to our own servers, so we do not start an international transfer of that content. When Apple processes a purchase, Apple’s privacy policy and local payment rules apply. EEA, UK, and California: we do not sell or share personal information for ads or cross-app tracking. To access or delete what is on the device, delete days in the app or delete the app, then email us. We cannot produce a server copy because there is none.",
    pChangeH: "Changes",
    pChange: "If this policy changes, we will update the date above and publish the new version on this page.",
    pContactH: "Contact",
    pContact: "Write to us with privacy questions. Days is an iOS countdown and anniversary tool. Developer: Zhichao Wei. There is no separate company server that collects your data.",
    supportTitle: "Days: Support",
    supportDesc: "Support and answers for the Days iOS app: adding a day, counts, widgets, themes, and the one-time Pro unlock.",
    supportH1: "Support",
    supportLede: "If something goes wrong, start with the answers below. If you are still stuck, email us with what you saw.",
    tocAdd: "Add a day",
    tocCount: "How counts work",
    tocWidget: "Widget mismatch",
    tocTheme: "Locked themes",
    tocPurchase: "Purchase failed",
    tocRestore: "Restore purchases",
    tocBackup: "Local backup",
    tocSubscribe: "Subscription",
    tocRefund: "Refunds",
    tocPrivacy: "Data and access",
    tocBug: "Report a bug",
    sAddH: "How do I add a day?",
    sAdd: "Open the app, tap Add a day, enter a name, pick a date, then save. That is the whole flow. The empty list has a button; later you can use the plus control. Names can be up to 80 characters. The library holds up to 500 days. If it is full, delete one first.",
    sCountH: "How are Today, N days left, and N days ago counted?",
    sCount: "By calendar day, not by the hour. The list, detail screen, Home Screen widgets, and Lock Screen widgets share the same count.",
    sWidgetH: "Why doesn’t the widget match the app?",
    sWidget: "Touch and hold the Home Screen or Lock Screen, tap plus or Customize, search for Days, then add a size. It can follow the nearest day, or you can pin one after a long press. It should match the detail count. After you change a date, wait for a refresh, or leave and return to the Home Screen. If widget sharing is unavailable, days still stay in the app, but the widget may not read them.",
    sThemeH: "I can preview a theme but not use it?",
    sTheme: "Free themes (Cinnabar Red, Amber Orange) can be used immediately. Locked themes (Rouge Pink, Celadon Green, Tea Gold, Ultramarine) need Pro. Tapping a card only previews it. Tap Use to apply it. If Pro is not unlocked, Use opens purchase. Closing the panel without Use keeps the previous theme.",
    sPurchaseH: "The purchase failed or was cancelled?",
    sPurchase: "Check the network and finish the Apple ID sheet. Cancel shows Canceled. A real failure can be retried. If it says waiting for approval, Ask to Buy needs the family organizer. That is not a failure. If it still fails, sign out and back into the App Store, or try later.",
    sRestoreH: "Themes disappeared after a new phone or reinstall?",
    sRestore: "Open Days, go to Settings or Upgrade to Pro, then tap Restore Purchases. Use the same Apple ID you bought with. Days themselves stay on that device and will not migrate automatically; add them again. The Pro unlock can be restored.",
    sBackupH: "What is Data backup in Settings?",
    sBackup: "It is a local snapshot, not iCloud sync. A usable copy is saved with your library. Damaged files are kept too. Restore this backup replaces the current list. After a new phone, add your days again and use Restore Purchases for Pro.",
    sSubH: "Is this a subscription?",
    sSub: "No. Product ID com.rizi.pro.themes is a one-time unlock (non-consumable), not a subscription. There is no renewal and no recurring charge. The price is local in the App Store. Days has nothing to cancel. Do not look for Days in Apple’s Subscriptions list.",
    sSubManage: "Open Apple subscription management",
    sSubHelp: "Read Apple’s official article",
    sRefundH: "How do I request a refund?",
    sRefund: "Apple handles payment. Request a refund with Report a Problem, or read Apple’s refund article. After a refund, Pro locks again and Pro themes fall back to free Cinnabar Red.",
    sRefundLink: "Report a Problem to Apple",
    sRefundHelp: "Apple refund help",
    sPrivacyH: "Do you collect my data? Do I need calendar access?",
    sPrivacy: "We do not collect personal data. Days and themes stay on device. Camera, photo library, notifications, and system calendar access are not required. Terms of Use are Apple’s standard EULA. See the privacy policy.",
    sPrivacyLink: "Open the privacy policy",
    sEulaLink: "Apple standard Terms of Use",
    sBugH: "How do I report a bug?",
    sBug: "Email the address below. Use the subject Days bug. Please include iPhone model, iOS version, what happened, whether you can repeat it, and a screenshot if you have one. Do not send your Apple ID password or card number.",
    sContactH: "Still stuck",
    sContact: "Developer: Zhichao Wei. We read every note about Days.",
    missingTitle: "Days: this page is missing",
    missingH1: "This page is missing",
    missingLede: "The link may be wrong. Go back to the site, or open support and privacy.",
    backHome: "Back to home"
  });

  function copyFrom(src, patch) {
    var out = {};
    var key;
    for (key in src) {
      if (Object.prototype.hasOwnProperty.call(src, key)) out[key] = src[key];
    }
    for (key in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, key)) out[key] = patch[key];
    }
    return out;
  }

  fill("ja", copyFrom(T.en, {
    skip: "本文へ",
    menu: "メニュー",
    navHome: "ホーム",
    navCounts: "日数",
    navThemes: "テーマ",
    navSupport: "サポート",
    navPrivacy: "プライバシー",
    language: "言語",
    comingStore: "近日 App Store に登場",
    writeDev: "開発者にメール",
    homeTitle: "日々: あと何日",
    homeDesc: "日々は試験、記念日、旅行、誕生日のカウントダウンです。名前と日付の2ステップ。テーマは先にプレビュー。基本無料。Pro は買い切り。個人データは集めません。",
    heroTitle: "あと何日",
    heroLede: "試験、記念日、旅行、誕生日。名前と日付だけで十分です。リスト、詳細、ウィジェットは同じ日数です。",
    browseThemes: "テーマを見る",
    countsTitle: "言い方は3つ、計算は1つ",
    countsLead: "カレンダー日で数えます。時間では数えません。今日、これから、過ぎた日、それぞれ1フレーズです。",
    countsFuture: "日付はまだ先です。リスト、詳細、ホームとロック画面のウィジェットもこの一文です。",
    countsPast: "日付は過ぎています。別の計算式はなく、ウィジェットもずれません。",
    themesTitle: "色テーマは先にプレビュー",
    themeNote: "カードはプレビューだけ。「使用」で確定します。朱砂の赤と琥珀の橙は無料。臙脂の桃、青磁の緑、秋茶の金、群青の青は Pro が必要です。",
    addTitle: "欄は2つ",
    addLede: "使い方を覚える必要はありません。開いて名前を書き、日付を選んで保存します。日数は自動で進みます。",
    fieldName: "名前",
    fieldDate: "日付",
    localTitle: "この iPhone だけ",
    localBody: "アカウントもクラウド同期も社交機能もありません。個人データは集めません。カメラ、写真、システムカレンダーも使いません。App を削除すると、日々も一緒に消えます。",
    price: "Pro は買い切り",
    priceNote: "色テーマをすべて解放します。サブスクリプションではありません。支払いは Apple が処理します。価格は App Store の現地表示です。",
    getTitle: "iPhone の日々",
    getBody: "iOS 17 以降。ホームの小・中・大、ロック画面の円・四角・一行。ウィジェットは一番近い日に従うか、指定した1件を固定できます。上限は 500 件です。",
    sceneExam: "期末試験",
    sceneBirthday: "誕生日パーティー",
    sceneLove: "記念日",
    sceneTravel: "出発日",
    sceneJob: "入社日",
    sceneGrad: "卒業",
    today: "今日です",
    remaining: { other: "あと {n} 日" },
    past: { other: "{n} 日経過" },
    privacyTitle: "日々 / Days プライバシーポリシー",
    privacyDesc: "日々は個人データを集めません。データは端末内。Pro の購入は Apple が処理します。",
    privacyH1: "プライバシーポリシー",
    privacyLede: "日々は端末上で動き、アカウントは不要です。個人データを収集、販売、共有しません。",
    privacyUpdated: "最終更新: 2026年9月16日",
    factPersonal: "個人データ",
    factPersonalV: "収集しない",
    factAccount: "アカウント",
    factAccountV: "不要",
    factTrack: "トラッキング",
    factTrackV: "なし",
    factStorage: "保存場所",
    factStorageV: "端末のみ",
    tocCollect: "収集するデータ",
    tocLocal: "端末内",
    tocBackup: "端末内バックアップ",
    tocPermissions: "権限",
    tocPurchases: "購入",
    tocRetention: "保存期間",
    tocChildren: "子ども",
    tocThird: "第三者",
    tocSite: "このサイト",
    tocRegion: "地域",
    tocChanges: "変更",
    tocContact: "連絡先",
    pCollectH: "収集するデータ",
    pCollect: "個人データは集めません。分析、広告、クラッシュ報告、AI API はありません。広告識別子（IDFA）も読まず、トラッキング許可も出しません。",
    pLocalH: "端末にだけ残るもの",
    pLocal1: "追加した日: 名前、日付、テーマ、作成時刻、端末内 ID",
    pLocal2: "テーマと表示の設定",
    pLocal3: "Pro が解除済みか（Apple に問い合わせた結果を、ウィジェット用に端末へ記録）",
    pLocal4: "端末内スナップショット: 保存時の可用バックアップと、破損時のコピー",
    pLocalP: "App Group のファイルと UserDefaults を含め、すべて端末内です。上限は 500 件。ウィジェットは既に保存された日だけを読みます。",
    pBackupH: "端末内バックアップであり、クラウド同期ではない",
    pBackup: "独自のクラウド同期はなく、iCloud Drive も CloudKit も使いません。保存のたびに、同じ端末へ最大2件の読めるスナップショットを残せます。破損ファイルのコピーが残ることもあります。設定の「データバックアップ」は、最新の読めるスナップショットで現在のリストを置き換えます。機種変更の移行ではありません。システムバックアップ（iCloud バックアップやコンピュータバックアップ）には、日の名前と日付が含まれる場合があります。",
    pPermH: "権限",
    pPerm: "カメラ、写真、マイク、位置情報、連絡先、システムカレンダー、通知、トラッキングは要求しません。Info.plist に用途説明がないのは、呼び出さないからです。ウィジェットは端末内の日だけを読みます。",
    pApiH: "システム API",
    pApi: "リストの読み書き、ウィジェット共有、端末内スナップショットのために UserDefaults とファイルのタイムスタンプを使います。端末内だけで、トラッキングには使いません。",
    pBuyH: "購入",
    pBuy: "任意の Pro 解除は Apple のアプリ内課金です。商品 ID は com.rizi.pro.themes で、非消耗型の買い切りです。サブスクリプションではなく、サブスクリプショングループもありません。App Store ではファミリー共有がオンで、購入者は家族とこの買い切りを共有できます。支払いは Apple が処理し、カード番号は届きません。購入、返金、取り消しの事実だけを Apple から受け取ります。返金後は Pro が閉じます。Ask to Buy は承認待ちと出ることがあり、失敗ではありません。",
    pKeepH: "保存期間",
    pKeep: "日のデータはこの端末に残ります。1件を削除するか、バックアップで上書きするか、App を削除するまでです。App を削除するとファイルとスナップショットも消えます。サーバ副本はないので、遠隔削除はできません。システムバックアップ内の副本は Apple の管理に従います。",
    pChildH: "子ども",
    pChild: "年齢区分は 4+ です。子どもを対象にデータを集めず、13歳未満（または地域のより高い年齢）から故意に個人データを集めません。個人データを集めないため、保護者同意が必要なオンラインアカウントもありません。",
    pThirdH: "第三者",
    pThird: "Apple（App Store / StoreKit）以外に、日のデータを送りません。分析 SDK、広告 SDK、ログイン、AI API はありません。利用規約は Apple 標準 EULA です。",
    pSiteH: "このサイト",
    pSite: "この方針は iOS アプリ「日々 / Days」向けです。静的ページで GitHub Pages に置いています。ホストは IP やブラウザなどの通常ログを残す場合があります。言語選択は localStorage に保存します。Cookie、分析、広告、第三者フォントは使いません。",
    pRegionH: "地域",
    pRegion: "日のデータを自社サーバへ送らないため、当社起点の越境移転はありません。購入は Apple のプライバシー方針と現地の支払いルールに従います。EEA、英国、カリフォルニア: 広告やクロスアプリ追跡のための販売・共有はしません。端末上の内容を削除するには、アプリ内で日を消すかアプリを削除し、その後メールしてください。サーバ副本はありません。",
    pChangeH: "変更",
    pChange: "方針を変える場合は、上の日付を更新し、このページに新しい版を出します。",
    pContactH: "連絡先",
    pContact: "プライバシーの質問はメールで。日々 / Days は iOS のカウントダウンと記念日ツールです。開発者: Zhichao Wei。あなたのデータを集める別会社サーバはありません。",
    supportTitle: "日々: サポート",
    supportDesc: "日々アプリのサポート。日の追加、日数、ウィジェット、テーマ、買い切りと復元。",
    supportH1: "サポート",
    supportLede: "うまくいかないときは、まず下の答えを見てください。足りなければ、起きたことをメールしてください。",
    tocAdd: "追加",
    tocCount: "日数",
    tocWidget: "ウィジェット",
    tocTheme: "テーマ",
    tocPurchase: "購入失敗",
    tocRestore: "購入の復元",
    tocBackup: "端末内バックアップ",
    tocSubscribe: "サブスク",
    tocRefund: "返金",
    tocPrivacy: "データ",
    tocBug: "不具合報告",
    sAddH: "日を追加するには？",
    sAdd: "アプリを開き、「日を追加」をタップし、名前と日付を入れて保存します。空のときはホームにボタンがあり、あとから右上のプラスも使えます。名前は最大80文字。上限は500件で、いっぱいなら先に削除します。",
    sCountH: "今日です / あと N 日 / N 日経過はどう数える？",
    sCount: "カレンダー日です。時間ではありません。リスト、詳細、ホームとロック画面のウィジェットは同じ数え方です。",
    sWidgetH: "ウィジェットの日数がアプリと違う",
    sWidget: "ホームまたはロック画面を長押しし、プラスまたはカスタマイズから Days / 日々 を検索して追加します。一番近い日に従うか、長押しで1件を固定できます。日付を変えた直後は、更新を待つかホームに戻り直してください。共有スペースが使えない場合、データはアプリ内に残ってもウィジェットは読めないことがあります。",
    sThemeH: "プレビューはできるが使えない",
    sTheme: "無料テーマ（朱砂の赤、琥珀の橙）は「使用」で確定します。ロック付き（臙脂の桃、青磁の緑、秋茶の金、群青の青）は Pro が必要です。カードはプレビューだけです。未購入なら「使用」で購入画面が開きます。パネルを閉じると元のテーマに戻ります。",
    sPurchaseH: "購入が失敗またはキャンセルされた",
    sPurchase: "ネットワークを確認し、Apple ID のシートを完了してください。キャンセルは「キャンセル」と出ます。失敗は再試行できます。承認待ちは Ask to Buy で、失敗ではありません。だめなら App Store から一度サインアウトして入り直すか、後で試してください。",
    sRestoreH: "機種変更や再インストールでテーマが消えた",
    sRestore: "日々を開き、設定または Pro にアップグレードから「購入を復元」をタップします。購入した同じ Apple ID が必要です。日そのものはその端末にだけあり、自動では移りません。日はもう一度追加してください。Pro の解除は復元できます。",
    sBackupH: "設定のバックアップとは？",
    sBackup: "端末内のスナップショットであり、iCloud 同期ではありません。「このバックアップを復元」は現在のリストを置き換えます。機種変更後は日を再追加し、Pro は「購入を復元」です。",
    sSubH: "サブスクリプションですか？解約は？",
    sSub: "いいえ。Pro は買い切り（非消耗型）で、更新も定期課金もありません。日々に解約するサブスクはありません。ほかの App のサブスクは Apple の公式手順で管理してください。iPhone の設定 > 名前 > サブスクリプション、または Safari の Apple サブスクリプション管理です。",
    sSubManage: "Apple のサブスクリプション管理を開く",
    sSubHelp: "Apple の公式記事を読む",
    sRefundH: "返金するには？",
    sRefund: "支払いは Apple が処理します。問題を報告するか、Apple の返金ヘルプを見てください。返金後は Pro が閉じ、Pro テーマは無料の朱砂の赤に戻ります。",
    sRefundLink: "Apple に問題を報告",
    sRefundHelp: "Apple の返金ヘルプ",
    sPrivacyH: "データを集めますか？カレンダー権限は？",
    sPrivacy: "個人データは集めません。日とテーマは端末内です。カメラ、写真、通知、システムカレンダーは不要です。利用規約は Apple 標準 EULA です。プライバシーポリシーを見てください。",
    sPrivacyLink: "プライバシーポリシーを開く",
    sEulaLink: "Apple 標準利用規約",
    sBugH: "不具合を報告するには？",
    sBug: "下のアドレスに、件名 Days bug で送ってください。iPhone のモデル、iOS バージョン、起きたこと、再現できるか、可能ならスクリーンショットを添えてください。Apple ID のパスワードやカード番号は送らないでください。",
    sContactH: "まだ解決しない",
    sContact: "開発者: Zhichao Wei。日々についてのメールは読みます。",
    missingTitle: "日々: このページはありません",
    missingH1: "このページはありません",
    missingLede: "リンクが違うかもしれません。ホーム、サポート、プライバシーへどうぞ。",
    backHome: "ホームへ戻る"
  }));

  function t(lang, key) {
    var pack = T[lang] || T.en || {};
    var value = pack[key];
    if (value == null && T.en) value = T.en[key];
    if (value == null && T["zh-Hans"]) value = T["zh-Hans"][key];
    return value;
  }

  function countPhrase(lang, offset) {
    var pack = T[lang] || T.en || T["zh-Hans"];
    if (!pack) return String(offset);
    if (offset === 0) return pack.today;
    var forms = offset > 0 ? pack.remaining : pack.past;
    var n = Math.abs(offset);
    return pickForm(forms || { other: "{n}" }, n, lang).replace(/\{n\}/g, String(n));
  }

  function normalize(raw) {
    if (!raw) return "";
    var s = String(raw).replace(/_/g, "-");
    var lower = s.toLowerCase();
    if (lower === "zh-hans" || lower === "zh-cn" || lower === "zh-sg" || lower === "zh") return "zh-Hans";
    if (lower === "zh-hant" || lower === "zh-tw" || lower === "zh-hk" || lower === "zh-mo") return "zh-Hant";
    if (lower === "pt-br" || lower.indexOf("pt") === 0) return "pt-BR";
    if (lower === "in") return "id";
    var i;
    for (i = 0; i < LOCALES.length; i += 1) {
      if (LOCALES[i].id.toLowerCase() === lower) return LOCALES[i].id;
    }
    var prefix = lower.split("-")[0];
    for (i = 0; i < LOCALES.length; i += 1) {
      if (LOCALES[i].id.toLowerCase().split("-")[0] === prefix) return LOCALES[i].id;
    }
    return "";
  }

  function detect(query, stored, nav) {
    return normalize(query) || normalize(stored) || normalize(nav) || "zh-Hans";
  }

  function localeMeta(id) {
    var key = normalize(id) || "zh-Hans";
    var i;
    for (i = 0; i < LOCALES.length; i += 1) {
      if (LOCALES[i].id === key) return LOCALES[i];
    }
    return LOCALES[0];
  }

  function loadLocale(id, cb) {
    var key = normalize(id) || "zh-Hans";
    if (T[key]) {
      cb(key, T[key]);
      return;
    }
    if (typeof fetch !== "function") {
      T[key] = copyFrom(T.en || {}, {});
      cb(key, T[key]);
      return;
    }
    fetch("i18n/" + key + ".json")
      .then(function (res) {
        if (!res.ok) throw new Error("locale");
        return res.json();
      })
      .then(function (dict) {
        T[key] = copyFrom(T.en || {}, dict);
        cb(key, T[key]);
      })
      .catch(function () {
        T[key] = copyFrom(T.en || {}, {});
        cb(key, T[key]);
      });
  }

  global.RIZI_I18N = {
    LOCALES: LOCALES,
    LINKS: LINKS,
    strings: T,
    t: t,
    countPhrase: countPhrase,
    detect: detect,
    normalize: normalize,
    localeMeta: localeMeta,
    loadLocale: loadLocale
  };
})(typeof window !== "undefined" ? window : this);
