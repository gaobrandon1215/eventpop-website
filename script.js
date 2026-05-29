'use strict';

/* ══════════════════════════════════════
   EVENTPOP LLC — ENHANCED SCRIPT (UPDATED)
   - Sort functionality in catalog
   - Modal quantity control & direct typing logic
   - Quote builder grouped by category + editable quantities
   - Sticky Mini-Quote Bar wired
══════════════════════════════════════ */

// ── CATALOG DATA (updated) ──
const CATALOG = [
  // ── SEATING (9) ──
  {id:1,cat:'seating',catLabel:'🪑 Seating', name:'White Padded Folding Chairs', priceLow:2,priceHigh:3,emoji:'🪑', desc:'Most-rented item. Buy in bulk 100+ for best price.', img:'images/white-chairs.avif'},
  {id:2,cat:'seating',catLabel:'🪑 Seating', name:'Chiavari Chairs (Gold/Silver/White)', priceLow:6,priceHigh:8,emoji:'🪑', desc:'Weddings & quinceañeras pay premium for these.', img:'https://source.unsplash.com/500x300/?chiavari,chair,wedding'},
  {id:3,cat:'seating',catLabel:'🪑 Seating', name:'Cross-Back / Farm Chairs', priceLow:7,priceHigh:9,emoji:'🪑', desc:'Rustic farm-style seating for outdoor and upscale events.', img:'https://source.unsplash.com/500x300/?farmchair,rustic,event'},
  {id:4,cat:'seating',catLabel:'🪑 Seating', name:'Throne / King Chair', priceLow:75,priceHigh:95,emoji:'👑', desc:'Easy upsell for birthday kids & bride/groom.', img:'https://source.unsplash.com/500x300/?throne,king,chair'},
  {id:5,cat:'seating',catLabel:'🪑 Seating', name:'Basic Metal Folding Chairs', priceLow:1.5,priceHigh:2,emoji:'🪑', desc:'Affordable metal folding chairs for any event.', img:'https://source.unsplash.com/500x300/?metal,folding,chair'},
  {id:6,cat:'seating',catLabel:'🪑 Seating', name:'Kids Folding Chairs', priceLow:1.5,priceHigh:2,emoji:'🪑', desc:'Small folding chairs sized perfectly for kids.', img:'https://source.unsplash.com/500x300/?kids,chair,small'},
  {id:7,cat:'seating',catLabel:'🪑 Seating', name:'Ghost Chairs (Clear Acrylic)', priceLow:12,priceHigh:15,emoji:'🪑', desc:'Modern clear acrylic chairs — great for upscale events.', img:'https://source.unsplash.com/500x300/?acrylic,clear,chair'},
  {id:8,cat:'seating',catLabel:'🪑 Seating', name:'Chair Covers (Spandex/Polyester)', priceLow:2,priceHigh:3,emoji:'🪑', desc:'Dress up basic chairs for weddings and formal events.', img:'https://source.unsplash.com/500x300/?chair,cover,wedding'},
  {id:9,cat:'seating',catLabel:'🪑 Seating', name:'Chair Sashes / Bows', priceLow:1,priceHigh:2,emoji:'🪑', desc:'Satin or organza sashes to accent chair covers.', img:'https://source.unsplash.com/500x300/?sash,ribbon,bow'},

  // ── TABLES (8) ──
  {id:10,cat:'tables',catLabel:'🍽️ Tables', name:'Round Table 60in (seats 8)', priceLow:10,priceHigh:13,emoji:'🍽️', desc:'Most popular round table. Seats 8 comfortably.', img:'https://source.unsplash.com/500x300/?round,table,event'},
  {id:11,cat:'tables',catLabel:'🍽️ Tables', name:'Round Table 48in (seats 6)', priceLow:9,priceHigh:11,emoji:'🍽️', desc:'Compact round table, great for smaller guest counts.', img:'https://source.unsplash.com/500x300/?table,dining,round'},
  {id:12,cat:'tables',catLabel:'🍽️ Tables', name:'Banquet Table 6ft', priceLow:12,priceHigh:15,emoji:'🍽️', desc:'Reliable rectangular banquet table for buffet, gifts, and more.', img:'https://source.unsplash.com/500x300/?banquet,table,event'},
  {id:13,cat:'tables',catLabel:'🍽️ Tables', name:'Banquet Table 8ft', priceLow:14,priceHigh:18,emoji:'🍽️', desc:'Longer banquet table — great for buffets and large setups.', img:'https://source.unsplash.com/500x300/?long,table,banquet'},
  {id:14,cat:'tables',catLabel:'🍽️ Tables', name:'Bar-Height Cocktail High-Top Tables', priceLow:18,priceHigh:24,emoji:'🍽️', desc:'Cocktail hour staple — easy upsell with spandex covers.', img:'https://source.unsplash.com/500x300/?cocktail,table,bar'},
  {id:15,cat:'tables',catLabel:'🍽️ Tables', name:'Kids Activity Table', priceLow:14,priceHigh:18,emoji:'🍽️', desc:'Low table for arts, crafts, and kids party activities.', img:'https://source.unsplash.com/500x300/?kids,table,activity'},
  {id:16,cat:'tables',catLabel:'🍽️ Tables', name:'Sweetheart / Cake Table', priceLow:20,priceHigh:26,emoji:'🍽️', desc:'Small decorative table for cake cutting or sweetheart couple.', img:'https://source.unsplash.com/500x300/?cake,table,wedding'},
  {id:17,cat:'tables',catLabel:'🍽️ Tables', name:'Buffet / Serving Table', priceLow:12,priceHigh:15,emoji:'🍽️', desc:'Dedicated table for food stations and catering setups.', img:'https://source.unsplash.com/500x300/?buffet,serving,table'},

  // ── TENTS (6) ──
  {id:18,cat:'tents',catLabel:'⛺ Tents & Canopies', name:'10x10 Pop-Up Canopy Tent', priceLow:75,priceHigh:95,emoji:'⛺', desc:'Compact pop-up tent for vendors, shade, and backyard parties.', img:'https://source.unsplash.com/500x300/?canopy,tent,outdoor'},
  {id:19,cat:'tents',catLabel:'⛺ Tents & Canopies', name:'10x20 Pop-Up Canopy Tent', priceLow:110,priceHigh:140,emoji:'⛺', desc:'Extended canopy for longer coverage areas and vendors.', img:'https://source.unsplash.com/500x300/?popup,tent,shade'},
  {id:20,cat:'tents',catLabel:'⛺ Tents & Canopies', name:'20x20 Frame Party Tent', priceLow:225,priceHigh:275,emoji:'🎪', desc:'Spacious event tent for medium-sized parties and gatherings.', img:'https://source.unsplash.com/500x300/?party,tent,event'},
  {id:21,cat:'tents',catLabel:'⛺ Tents & Canopies', name:'20x40 Large Frame Tent', priceLow:450,priceHigh:550,emoji:'🎪', desc:'Large tent for weddings, corporate events, and big parties.', img:'https://source.unsplash.com/500x300/?large,tent,wedding'},
  {id:22,cat:'tents',catLabel:'⛺ Tents & Canopies', name:'Tent Sidewalls (per panel)', priceLow:25,priceHigh:35,emoji:'⛺', desc:'Add sidewalls to any tent for wind, rain, or privacy.', img:'https://source.unsplash.com/500x300/?tent,sidewall,panel'},
  {id:23,cat:'tents',catLabel:'⛺ Tents & Canopies', name:'Tent String-Light Package', priceLow:65,priceHigh:85,emoji:'✨', desc:'Warm string lights draped inside tent for ambiance.', img:'https://source.unsplash.com/500x300/?string,lights,tent'},

  // ── LINENS (11) ──
  {id:24,cat:'linens',catLabel:'🌸 Linens & Tableware', name:'Round Tablecloth (any size)', priceLow:10,priceHigh:13,emoji:'🌸', desc:'Elegant tablecloths in multiple colors and sizes.', img:'https://source.unsplash.com/500x300/?tablecloth,linen,table'},
  {id:25,cat:'linens',catLabel:'🌸 Linens & Tableware', name:'Rectangular Tablecloth (6ft/8ft)', priceLow:8,priceHigh:11,emoji:'🌸', desc:'Fitted or draped rectangular tablecloths for banquet tables.', img:'https://source.unsplash.com/500x300/?tablecloth,rectangle,linen'},
  {id:26,cat:'linens',catLabel:'🌸 Linens & Tableware', name:'Cocktail Spandex Cover (high-top)', priceLow:7,priceHigh:9,emoji:'🌸', desc:'Stretch spandex covers that fit snug on high-top tables.', img:'https://source.unsplash.com/500x300/?spandex,cover,cocktail'},
  {id:27,cat:'linens',catLabel:'🌸 Linens & Tableware', name:'Table Runner', priceLow:4,priceHigh:6,emoji:'🌸', desc:'Add a pop of color or texture down the center of tables.', img:'https://source.unsplash.com/500x300/?table,runner,decor'},
  {id:28,cat:'linens',catLabel:'🌸 Linens & Tableware', name:'Table Overlay / Topper', priceLow:5,priceHigh:7,emoji:'🌸', desc:'Sheer or satin overlays layered over base tablecloth.', img:'https://source.unsplash.com/500x300/?overlay,table,satin'},
  {id:29,cat:'linens',catLabel:'🌸 Linens & Tableware', name:'Cloth Napkins (per napkin)', priceLow:1,priceHigh:2,emoji:'🌸', desc:'Pressed cloth napkins in multiple colors.', img:'https://source.unsplash.com/500x300/?napkin,cloth,dining'},
  {id:30,cat:'linens',catLabel:'🌸 Linens & Tableware', name:'Table Skirt', priceLow:12,priceHigh:16,emoji:'🌸', desc:'Decorative table skirts for buffet or gift tables.', img:'https://source.unsplash.com/500x300/?table,skirt,event'},
  {id:31,cat:'linens',catLabel:'🌸 Linens & Tableware', name:'Charger Plates (per plate)', priceLow:1.5,priceHigh:2,emoji:'🍽️', desc:'Gold, silver, or rose gold charger plates for formal settings.', img:'https://source.unsplash.com/500x300/?charger,plate,gold'},
  {id:32,cat:'linens',catLabel:'🌸 Linens & Tableware', name:'Place Settings (plate, fork, knife, spoon)', priceLow:3,priceHigh:4,emoji:'🍽️', desc:'Complete place settings per guest.', img:'https://source.unsplash.com/500x300/?place,setting,dining'},
  {id:33,cat:'linens',catLabel:'🌸 Linens & Tableware', name:'Wine Glasses (per glass)', priceLow:1.5,priceHigh:2,emoji:'🥂', desc:'Clear wine glasses for weddings and formal events.', img:'https://source.unsplash.com/500x300/?wine,glass,event'},
  {id:34,cat:'linens',catLabel:'🌸 Linens & Tableware', name:'Champagne Flutes (per flute)', priceLow:1.5,priceHigh:2,emoji:'🥂', desc:'Elegant champagne flutes for toasts and celebrations.', img:'https://source.unsplash.com/500x300/?champagne,flute,toast'},

  // ── DECOR (18) ──
  {id:35,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Floral Centerpiece (faux)', priceLow:35,priceHigh:45,emoji:'🌸', desc:'Lush faux floral arrangements — no wilting, great photos.', img:'https://source.unsplash.com/500x300/?flower,centerpiece,table'},
  {id:36,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'LED Candle Centerpiece Set', priceLow:15,priceHigh:20,emoji:'🕯️', desc:'Flameless LED candles in varying heights for elegant tables.', img:'https://source.unsplash.com/500x300/?candle,centerpiece,led'},
  {id:37,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Lantern Centerpiece Set', priceLow:20,priceHigh:26,emoji:'🏮', desc:'Decorative lanterns for boho, rustic, or elegant themes.', img:'https://source.unsplash.com/500x300/?lantern,decor,table'},
  {id:38,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Balloon Arch Frame Kit', priceLow:45,priceHigh:58,emoji:'🎈', desc:'DIY balloon arch frame — bring your own balloons.', img:'https://source.unsplash.com/500x300/?balloon,arch,party'},
  {id:39,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Backdrop Stand (adjustable)', priceLow:30,priceHigh:38,emoji:'🖼️', desc:'Adjustable backdrop stand for photo backdrops and draping.', img:'https://source.unsplash.com/500x300/?backdrop,stand,photo'},
  {id:40,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Flower Wall Panel (faux 8x8)', priceLow:175,priceHigh:225,emoji:'🌸', desc:'A stunning 8x8 flower wall for unforgettable photos.', img:'https://source.unsplash.com/500x300/?flower,wall,backdrop'},
  {id:41,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Greenery Wall / Hedge Wall', priceLow:150,priceHigh:195,emoji:'🌿', desc:'Lush boxwood hedge wall — perfect for photo ops.', img:'https://source.unsplash.com/500x300/?greenery,hedge,wall'},
  {id:42,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Circle Arch (metal)', priceLow:55,priceHigh:70,emoji:'⭕', desc:'Metal circle arch for floral or balloon arrangements.', img:'https://source.unsplash.com/500x300/?circle,arch,wedding'},
  {id:43,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Geometric Arch (hexagon/square)', priceLow:55,priceHigh:70,emoji:'🔷', desc:'Modern geometric arch for contemporary event styling.', img:'https://source.unsplash.com/500x300/?geometric,arch,modern'},
  {id:44,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Pipe & Drape System (per section)', priceLow:40,priceHigh:52,emoji:'🎭', desc:'Classic pipe & drape for backdrops, dividers, and staging.', img:'https://source.unsplash.com/500x300/?pipe,drape,event'},
  {id:45,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Marquee Letters (per letter, light-up)', priceLow:30,priceHigh:38,emoji:'🔡', desc:'Light-up marquee letters — LOVE, initials, names, numbers.', img:'https://source.unsplash.com/500x300/?marquee,letters,light'},
  {id:46,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Welcome Sign Easel', priceLow:20,priceHigh:26,emoji:'🖼️', desc:'Gold or black easel for seating charts and welcome signs.', img:'https://source.unsplash.com/500x300/?easel,sign,wedding'},
  {id:47,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Acrylic Sign / Seating Chart Frame', priceLow:25,priceHigh:32,emoji:'🖼️', desc:'Clear acrylic frame for seating charts or custom signage.', img:'https://source.unsplash.com/500x300/?acrylic,sign,frame'},
  {id:48,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Donut Wall Display', priceLow:45,priceHigh:58,emoji:'🍩', desc:'Rustic pegboard donut wall — huge hit at parties.', img:'https://source.unsplash.com/500x300/?donut,wall,party'},
  {id:49,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Candy / Dessert Cart', priceLow:65,priceHigh:85,emoji:'🍬', desc:'Decorative cart for candy bars and dessert displays.', img:'https://source.unsplash.com/500x300/?candy,cart,dessert'},
  {id:50,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Red Carpet (3ft x 10ft section)', priceLow:55,priceHigh:70,emoji:'🟥', desc:'Classic red carpet runner for entrances and photo ops.', img:'https://source.unsplash.com/500x300/?red,carpet,event'},
  {id:51,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Stanchions & Velvet Rope Set', priceLow:35,priceHigh:45,emoji:'🚧', desc:'Gold stanchions with velvet rope for VIP areas.', img:'https://source.unsplash.com/500x300/?stanchion,velvet,rope'},
  {id:52,cat:'decor',catLabel:'🌺 Decor & Centerpieces', name:'Balloon Column Kit', priceLow:25,priceHigh:32,emoji:'🎈', desc:'Balloon column stand kits for entrances and stage décor.', img:'https://source.unsplash.com/500x300/?balloon,column,decor'},

  // ── LIGHTING (11) ──
  {id:53,cat:'lighting',catLabel:'💡 Lighting & Neon', name:'LED Neon Sign (generic phrase)', priceLow:65,priceHigh:85,emoji:'✨', desc:'Eye-catching LED neon signs for parties and photos.', img:'https://source.unsplash.com/500x300/?neon,sign,light'},
  {id:54,cat:'lighting',catLabel:'💡 Lighting & Neon', name:'Custom LED Neon Sign', priceLow:95,priceHigh:125,emoji:'✨', desc:'Custom wording or design — charge premium for personalization.', img:'https://source.unsplash.com/500x300/?custom,neon,glow'},
  {id:55,cat:'lighting',catLabel:'💡 Lighting & Neon', name:'Uplights (set of 4, wireless LED)', priceLow:85,priceHigh:110,emoji:'💡', desc:'Color-wash uplights to transform any venue wall or tent.', img:'https://source.unsplash.com/500x300/?uplight,led,colorful'},
  {id:56,cat:'lighting',catLabel:'💡 Lighting & Neon', name:'Fairy Light Curtain Backdrop', priceLow:45,priceHigh:58,emoji:'✨', desc:'Warm white or multicolor fairy light curtain for backdrops.', img:'https://source.unsplash.com/500x300/?fairy,light,curtain'},
  {id:57,cat:'lighting',catLabel:'💡 Lighting & Neon', name:'Sequin Backdrop Panel', priceLow:55,priceHigh:70,emoji:'✨', desc:'Shimmering gold, silver, or rose gold sequin backdrop.', img:'https://source.unsplash.com/500x300/?sequin,backdrop,shimmer'},
  {id:58,cat:'lighting',catLabel:'💡 Lighting & Neon', name:'Disco Ball Kit (ball + motor + light)', priceLow:35,priceHigh:45,emoji:'🪩', desc:'Classic disco ball setup — instant dance floor energy.', img:'https://source.unsplash.com/500x300/?disco,ball,party'},
  {id:59,cat:'lighting',catLabel:'💡 Lighting & Neon', name:'String Lights (per strand, 25ft)', priceLow:8,priceHigh:11,emoji:'💡', desc:'Warm white string lights for tents, patios, and backdrops.', img:'https://source.unsplash.com/500x300/?string,lights,warm'},
  {id:60,cat:'lighting',catLabel:'💡 Lighting & Neon', name:'Edison Bulb String Lights (vintage)', priceLow:12,priceHigh:16,emoji:'💡', desc:'Vintage Edison bulb strands for rustic and boho aesthetics.', img:'https://source.unsplash.com/500x300/?edison,bulb,vintage'},
  {id:61,cat:'lighting',catLabel:'💡 Lighting & Neon', name:'Paper Lanterns (set of 10)', priceLow:15,priceHigh:20,emoji:'🏮', desc:'Hanging paper lanterns in assorted colors and sizes.', img:'https://source.unsplash.com/500x300/?paper,lantern,hanging'},
  {id:62,cat:'lighting',catLabel:'💡 Lighting & Neon', name:'DJ Lighting Rig (moving heads + stand)', priceLow:95,priceHigh:125,emoji:'🎛️', desc:'Full DJ lighting rig with moving heads and stand.', img:'https://source.unsplash.com/500x300/?dj,lighting,stage'},
  {id:63,cat:'lighting',catLabel:'💡 Lighting & Neon', name:'Fog / Bubble Machine', priceLow:45,priceHigh:58,emoji:'💨', desc:'Fog or bubble machine — awesome for dance floors and kids.', img:'https://source.unsplash.com/500x300/?fog,machine,smoke'},

  // ── INFLATABLES (6) ──
  {id:64,cat:'inflatables',catLabel:'🏰 Inflatables', name:'Classic Bounce House', priceLow:130,priceHigh:170,emoji:'🏰', desc:'Classic bounce house fun for birthdays and outdoor parties.', img:'images\Marketing Photos and Videos\Screenshot 2026-05-29 002833.png'},
  {id:65,cat:'inflatables',catLabel:'🏰 Inflatables', name:'Combo Bounce House + Slide', priceLow:175,priceHigh:225,emoji:'🏰', desc:'Bounce AND slide combo — best value for kids parties.', img:'images\Marketing Photos and Videos\Screenshot 2026-05-29 002833.png'},
  {id:66,cat:'inflatables',catLabel:'🏰 Inflatables', name:'Obstacle Course Inflatable', priceLow:225,priceHigh:285,emoji:'🏃', desc:'Competitive obstacle course inflatable for all ages.', img:'https://source.unsplash.com/500x300/?obstacle,course,kids'},
  {id:67,cat:'inflatables',catLabel:'🏰 Inflatables', name:'Water Slide Inflatable', priceLow:200,priceHigh:260,emoji:'💦', desc:'Summer hit — water slide inflatable for backyard parties.', img:'images\Marketing Photos and Videos\Screenshot 2026-05-28 214408.png'},
  {id:68,cat:'inflatables',catLabel:'🏰 Inflatables', name:'Toddler Mini Bounce House', priceLow:90,priceHigh:115,emoji:'🏰', desc:'Smaller, safe bounce house designed for toddlers under 5.', img:'https://source.unsplash.com/500x300/?toddler,bounce,play'},
  {id:69,cat:'inflatables',catLabel:'🏰 Inflatables', name:'Themed Bounce House (princess/superhero)', priceLow:150,priceHigh:195,emoji:'🏰', desc:'Licensed themed bounce houses — charge premium for themes.', img:'https://source.unsplash.com/500x300/?themed,bounce,castle'},

  // ── NERF WARS (4) ──
  {id:70,cat:'nerf',catLabel:'🔫 Nerf Wars', name:'Hosted Nerf Party (up to 10 kids)', priceLow:199,priceHigh:199,emoji:'🔫', desc:'Fully hosted Nerf battle — our signature experience. Staff included.', img:'images\Marketing Photos and Videos\Screenshot 2026-05-28 214016.png'},
  {id:71,cat:'nerf',catLabel:'🔫 Nerf Wars', name:'Hosted Nerf Party (up to 20 kids)', priceLow:299,priceHigh:299,emoji:'🔫', desc:'Large hosted Nerf battle for bigger birthday groups. Fully staffed.', img:'images\Marketing Photos and Videos\Screenshot 2026-05-28 214016.png'},
  {id:72,cat:'nerf',catLabel:'🔫 Nerf Wars', name:'Nerf Equipment Only (no host)', priceLow:75,priceHigh:75,emoji:'🔫', desc:'Rent the blasters, ammo, vests, and barriers — no host included.', img:'images\Marketing Photos and Videos\Screenshot 2026-05-28 214016.png'},
  {id:73,cat:'nerf',catLabel:'🔫 Nerf Wars', name:'Nerf Extra Hour Add-On', priceLow:75,priceHigh:75,emoji:'🔫', desc:'Extend your hosted Nerf party by an additional hour.', img:'https://source.unsplash.com/500x300/?nerf,play,fun'},

  // ── PHOTO (6) ──
  {id:74,cat:'photo',catLabel:'📸 Photo & Video', name:'Photo Booth (2-hour)', priceLow:250,priceHigh:320,emoji:'📸', desc:'2-hour open-air photo booth with props and instant prints.', img:'images\Marketing Photos and Videos\video_slot__generic_video_2.mp4.mp4'},
  {id:75,cat:'photo',catLabel:'📸 Photo & Video', name:'Photo Booth (4-hour)', priceLow:375,priceHigh:475,emoji:'📸', desc:'4-hour open-air photo booth — most popular option for parties.', img:'images\Marketing Photos and Videos\video_slot__generic_video_2.mp4.mp4'},
  {id:76,cat:'photo',catLabel:'📸 Photo & Video', name:'360° Video Spinning Booth', priceLow:445,priceHigh:555,emoji:'🎬', desc:'Viral-worthy 360 video booth for weddings and parties.', img:'https://source.unsplash.com/500x300/?360,video,booth'},
  {id:77,cat:'photo',catLabel:'📸 Photo & Video', name:'Selfie Mirror Booth', priceLow:325,priceHigh:415,emoji:'🪞', desc:'Full-length mirror booth with touchscreen and instant prints.', img:'images\Marketing Photos and Videos\video_slot__generic_video_2.mp4.mp4'},
  {id:78,cat:'photo',catLabel:'📸 Photo & Video', name:'Roaming Photo Booth (attendant)', priceLow:275,priceHigh:350,emoji:'📸', desc:'Attendant roams the party capturing candid shots with instant sharing.', img:'https://source.unsplash.com/500x300/?roaming,camera,party'},
  {id:79,cat:'photo',catLabel:'📸 Photo & Video', name:'Green Screen Station', priceLow:200,priceHigh:260,emoji:'🎬', desc:'Green screen setup for custom digital backgrounds on photos.', img:'https://source.unsplash.com/500x300/?green,screen,photo'},

  // ── YARD GAMES (10) ──
  {id:80,cat:'yard',catLabel:'🎯 Yard Games', name:'Cornhole Set', priceLow:22,priceHigh:28,emoji:'🎯', desc:'Classic outdoor cornhole fun for all ages.', img:'https://source.unsplash.com/500x300/?cornhole,backyard,game'},
  {id:81,cat:'yard',catLabel:'🎯 Yard Games', name:'Giant Jenga', priceLow:28,priceHigh:36,emoji:'🧱', desc:'Oversized Jenga blocks — crowd-pleaser at every event.', img:'https://source.unsplash.com/500x300/?giant,jenga,blocks'},
  {id:82,cat:'yard',catLabel:'🎯 Yard Games', name:'Giant Connect Four', priceLow:30,priceHigh:38,emoji:'🔴', desc:'Life-size Connect Four — competitive fun for kids and adults.', img:'https://source.unsplash.com/500x300/?connect,four,game'},
  {id:83,cat:'yard',catLabel:'🎯 Yard Games', name:'Spikeball Set', priceLow:22,priceHigh:28,emoji:'🏐', desc:'Trendy Spikeball — popular with teens and young adults.', img:'https://source.unsplash.com/500x300/?spikeball,outdoor,sport'},
  {id:84,cat:'yard',catLabel:'🎯 Yard Games', name:'Ring Toss Game', priceLow:15,priceHigh:20,emoji:'⭕', desc:'Classic ring toss set for backyard and carnival-themed parties.', img:'https://source.unsplash.com/500x300/?ring,toss,carnival'},
  {id:85,cat:'yard',catLabel:'🎯 Yard Games', name:'Ladder Ball / Ladder Toss', priceLow:18,priceHigh:23,emoji:'🪜', desc:'Bolo toss game — easy to learn, fun for all ages.', img:'https://source.unsplash.com/500x300/?ladder,ball,outdoor'},
  {id:86,cat:'yard',catLabel:'🎯 Yard Games', name:'Bocce Ball Set', priceLow:18,priceHigh:23,emoji:'🔵', desc:'Classic bocce ball set for lawn parties and picnics.', img:'https://source.unsplash.com/500x300/?bocce,ball,lawn'},
  {id:87,cat:'yard',catLabel:'🎯 Yard Games', name:'Horseshoes Set', priceLow:15,priceHigh:20,emoji:'🧲', desc:'Traditional horseshoe set with stakes for outdoor events.', img:'https://source.unsplash.com/500x300/?horseshoes,outdoor,game'},
  {id:88,cat:'yard',catLabel:'🎯 Yard Games', name:'Yard Games Bundle (any 5 games)', priceLow:90,priceHigh:115,emoji:'🎮', desc:'Pick any 5 yard games — best value bundle for party hosts.', img:'https://source.unsplash.com/500x300/?outdoor,games,party'},
  {id:89,cat:'yard',catLabel:'🎯 Yard Games', name:'Karaoke Machine', priceLow:65,priceHigh:85,emoji:'🎤', desc:'Wireless karaoke machine with mic — instant party energy.', img:'https://source.unsplash.com/500x300/?karaoke,microphone,singing'},

  // ── CONCESSION (6) ──
  {id:90,cat:'concession',catLabel:'🍿 Concessions', name:'Popcorn Machine', priceLow:58,priceHigh:75,emoji:'🍿', desc:'Fresh popcorn machine for movie nights and parties.', img:'https://source.unsplash.com/500x300/?popcorn,machine,snack'},
  {id:91,cat:'concession',catLabel:'🍿 Concessions', name:'Cotton Candy Machine', priceLow:58,priceHigh:75,emoji:'🍭', desc:'Spin fresh cotton candy at your event — kids go crazy for it.', img:'https://source.unsplash.com/500x300/?cotton,candy,sweet'},
  {id:92,cat:'concession',catLabel:'🍿 Concessions', name:'Snow Cone Machine', priceLow:50,priceHigh:65,emoji:'🧊', desc:'Summer party essential — snow cone machine with flavor options.', img:'https://source.unsplash.com/500x300/?snow,cone,ice'},
  {id:93,cat:'concession',catLabel:'🍿 Concessions', name:'Slushie / Margarita Machine', priceLow:75,priceHigh:95,emoji:'🍹', desc:'Frozen slushie or margarita machine — adult party favorite.', img:'https://source.unsplash.com/500x300/?slushie,frozen,drink'},
  {id:94,cat:'concession',catLabel:'🍿 Concessions', name:'Hot Dog Roller Cart', priceLow:65,priceHigh:85,emoji:'🌭', desc:'Commercial hot dog roller cart for backyard cookouts and events.', img:'https://source.unsplash.com/500x300/?hotdog,cart,food'},
  {id:95,cat:'concession',catLabel:'🍿 Concessions', name:'Chocolate Fountain', priceLow:75,priceHigh:95,emoji:'🍫', desc:'Flowing chocolate fountain with dipping skewers and toppings.', img:'https://source.unsplash.com/500x300/?chocolate,fountain,dessert'},

  // ── AUDIO (9) ──
  {id:96,cat:'audio',catLabel:'🎵 Audio & AV', name:'Bluetooth Speaker (portable, large)', priceLow:35,priceHigh:45,emoji:'🔊', desc:'Loud portable Bluetooth speaker — perfect for backyard parties.', img:'https://source.unsplash.com/500x300/?bluetooth,speaker,music'},
  {id:97,cat:'audio',catLabel:'🎵 Audio & AV', name:'PA System + Wired Mic', priceLow:75,priceHigh:95,emoji:'🎙️', desc:'Full PA system with speaker, amp, and wired microphone.', img:'https://source.unsplash.com/500x300/?pa,speaker,sound'},
  {id:98,cat:'audio',catLabel:'🎵 Audio & AV', name:'Wireless Microphone (handheld)', priceLow:35,priceHigh:45,emoji:'🎤', desc:'Wireless handheld mic for speeches, toasts, and performances.', img:'https://source.unsplash.com/500x300/?wireless,microphone,speech'},
  {id:99,cat:'audio',catLabel:'🎵 Audio & AV', name:'10ft Inflatable Movie Screen', priceLow:85,priceHigh:110,emoji:'🎬', desc:'10-foot inflatable movie screen for outdoor movie nights.', img:'https://source.unsplash.com/500x300/?outdoor,movie,screen'},
  {id:100,cat:'audio',catLabel:'🎵 Audio & AV', name:'16ft Inflatable Movie Screen', priceLow:130,priceHigh:170,emoji:'🎬', desc:'Giant 16-foot inflatable screen for large outdoor movie events.', img:'https://source.unsplash.com/500x300/?movie,projector,outdoor'},
  {id:101,cat:'audio',catLabel:'🎵 Audio & AV', name:'HD Projector', priceLow:65,priceHigh:85,emoji:'📽️', desc:'1080p HD projector — pairs with any of our movie screens.', img:'https://source.unsplash.com/500x300/?projector,cinema,hd'},
  {id:102,cat:'audio',catLabel:'🎵 Audio & AV', name:'Full Outdoor Movie Bundle', priceLow:310,priceHigh:390,emoji:'🍿', desc:'Complete outdoor movie night — screen, projector, and sound system.', img:'https://source.unsplash.com/500x300/?outdoor,movie,night'},
  {id:103,cat:'audio',catLabel:'🎵 Audio & AV', name:'Indoor Projector Screen (tripod)', priceLow:35,priceHigh:45,emoji:'📽️', desc:'Portable indoor projector screen on tripod stand.', img:'https://source.unsplash.com/500x300/?projector,screen,indoor'},
  {id:104,cat:'audio',catLabel:'🎵 Audio & AV', name:'Podium with Microphone', priceLow:55,priceHigh:70,emoji:'🎙️', desc:'Professional podium with built-in microphone for speeches.', img:'https://source.unsplash.com/500x300/?podium,speech,event'},

  // ── HIGH-TICKET (simplified + new items) ──
  {id:105,cat:'highticket',catLabel:'🎪 High-Ticket', name:'Casino Table Set (blackjack/poker)', priceLow:250,priceHigh:320,emoji:'🃏', desc:'Professional casino tables for casino night events.', img:'https://source.unsplash.com/500x300/?casino,poker,table'},
  {id:108,cat:'highticket',catLabel:'🎪 High-Ticket', name:'Laser Tag Gear Rental', priceLow:275,priceHigh:275,emoji:'🔦', desc:'Full laser tag gear set — vests, blasters, and basic game ideas. Equipment-only; customer runs the games.', img:'https://source.unsplash.com/500x300/?laser,tag,game'},
  {id:109,cat:'highticket',catLabel:'🎪 High-Ticket', name:'Foam Party Machine', priceLow:200,priceHigh:260,emoji:'🫧', desc:'Foam cannon machine for epic foam parties and summer events.', img:'https://source.unsplash.com/500x300/?foam,party,summer'},
  {id:110,cat:'highticket',catLabel:'🎪 High-Ticket', name:'Commercial Bubble Machine', priceLow:55,priceHigh:70,emoji:'🫧', desc:'Heavy-duty bubble machine for outdoor and indoor parties.', img:'https://source.unsplash.com/500x300/?bubble,machine,kids'},
  {id:1150,cat:'highticket',catLabel:'🎪 High-Ticket', name:'Soak-A-Seat Water Game', priceLow:100,priceHigh:100,emoji:'💦', desc:'Interactive water game where guests sit over a splash bucket and get soaked when the target is hit. Safer alternative to a full dunk tank.', img:'https://source.unsplash.com/500x300/?water,game,summer'},

  // ── LOUNGE (6) ──
  {id:114,cat:'lounge',catLabel:'🛋️ Lounge Furniture', name:'Velvet Loveseat / Sofa (2-seat)', priceLow:88,priceHigh:112,emoji:'🛋️', desc:'Stylish velvet sofa for lounge setups and upscale events.', img:'https://source.unsplash.com/500x300/?velvet,sofa,lounge'},
  {id:115,cat:'lounge',catLabel:'🛋️ Lounge Furniture', name:'Ottoman Cube Set (4 cubes)', priceLow:55,priceHigh:70,emoji:'🪑', desc:'Modular ottoman cubes — flexible seating for lounge areas.', img:'https://source.unsplash.com/500x300/?ottoman,cube,seating'},
  {id:116,cat:'lounge',catLabel:'🛋️ Lounge Furniture', name:'Gold Throne Accent Chair', priceLow:65,priceHigh:85,emoji:'👑', desc:'Glamorous gold accent throne chair for photo moments.', img:'https://source.unsplash.com/500x300/?gold,throne,luxury'},
  {id:117,cat:'lounge',catLabel:'🛋️ Lounge Furniture', name:'Barstools Set (4 stools)', priceLow:55,priceHigh:70,emoji:'🪑', desc:'Modern or rustic barstools for cocktail and lounge setups.', img:'https://source.unsplash.com/500x300/?barstool,bar,seating'},
  {id:118,cat:'lounge',catLabel:'🛋️ Lounge Furniture', name:'Wicker / Rattan Lounge Set', priceLow:110,priceHigh:140,emoji:'🛋️', desc:'Boho wicker lounge set — sofa, chairs, and table.', img:'https://source.unsplash.com/500x300/?wicker,rattan,outdoor'},
  {id:119,cat:'lounge',catLabel:'🛋️ Lounge Furniture', name:'Portable Bar Unit', priceLow:95,priceHigh:125,emoji:'🍸', desc:'Portable bar unit — perfect for cocktail hours and receptions.', img:'https://source.unsplash.com/500x300/?portable,bar,cocktail'},

  // ── ESSENTIALS (12) ──
  {id:120,cat:'essentials',catLabel:'🛠️ Event Essentials', name:'Trash Cans + Liners Set', priceLow:15,priceHigh:20,emoji:'🗑️', desc:'Decorative or commercial trash cans with liners.', img:'https://source.unsplash.com/500x300/?trash,can,event'},
  {id:121,cat:'essentials',catLabel:'🛠️ Event Essentials', name:'Coat Rack (freestanding)', priceLow:18,priceHigh:23,emoji:'🧥', desc:'Freestanding coat rack for indoor events and formal occasions.', img:'https://source.unsplash.com/500x300/?coat,rack,indoor'},
  {id:122,cat:'essentials',catLabel:'🛠️ Event Essentials', name:'Extension Cords + Power Strip Bundle', priceLow:12,priceHigh:16,emoji:'🔌', desc:'Heavy-duty extension cords and power strips for event setups.', img:'https://source.unsplash.com/500x300/?extension,cord,power'},
  {id:123,cat:'essentials',catLabel:'🛠️ Event Essentials', name:'Patio Heater (propane)', priceLow:65,priceHigh:85,emoji:'🔥', desc:'Keep guests warm at fall and winter outdoor events.', img:'https://source.unsplash.com/500x300/?patio,heater,outdoor'},
  {id:124,cat:'essentials',catLabel:'🛠️ Event Essentials', name:'Large Industrial Fan', priceLow:35,priceHigh:45,emoji:'🌀', desc:'Heavy-duty fan for summer outdoor events and tent cooling.', img:'https://source.unsplash.com/500x300/?fan,industrial,cooling'},
  {id:125,cat:'essentials',catLabel:'🛠️ Event Essentials', name:'Canopy / Tent Weights Set', priceLow:20,priceHigh:26,emoji:'⚖️', desc:'Sandbag or plate weights to anchor tents and canopies.', img:'https://source.unsplash.com/500x300/?tent,weight,anchor'},
  {id:126,cat:'essentials',catLabel:'🛠️ Event Essentials', name:'Chafing Dishes Set (4-pack)', priceLow:35,priceHigh:45,emoji:'🍲', desc:'Stainless steel chafing dishes for catering and buffet setups.', img:'https://source.unsplash.com/500x300/?chafing,dish,catering'},
  {id:127,cat:'essentials',catLabel:'🛠️ Event Essentials', name:'Beverage Dispensers (set of 3)', priceLow:30,priceHigh:38,emoji:'🥤', desc:'Glass or acrylic beverage dispensers for cocktail stations.', img:'https://source.unsplash.com/500x300/?beverage,dispenser,drink'},
  {id:128,cat:'essentials',catLabel:'🛠️ Event Essentials', name:'Ice Tubs / Beverage Tubs (set of 2)', priceLow:20,priceHigh:26,emoji:'🧊', desc:'Metal or plastic ice tubs for keeping drinks cold.', img:'https://source.unsplash.com/500x300/?ice,tub,beverage'},
  {id:129,cat:'essentials',catLabel:'🛠️ Event Essentials', name:'Bar Accessories Set', priceLow:25,priceHigh:32,emoji:'🍸', desc:'Complete bar accessories: shakers, openers, pourers, and more.', img:'https://source.unsplash.com/500x300/?bar,accessories,cocktail'},
  {id:130,cat:'essentials',catLabel:'🛠️ Event Essentials', name:'Serving Platters + Trays Set', priceLow:20,priceHigh:26,emoji:'🍽️', desc:'Elegant serving platters and trays for appetizers and desserts.', img:'https://source.unsplash.com/500x300/?serving,platter,tray'},
  {id:131,cat:'essentials',catLabel:'🛠️ Event Essentials', name:'Coffee / Tea Station Setup', priceLow:35,priceHigh:45,emoji:'☕', desc:'Complete coffee and tea station with urns, cups, and condiments.', img:'https://source.unsplash.com/500x300/?coffee,tea,station'},
];
// ── STATE ──
const quoteState = {};

// ══════════════════════════════════════
// 🎨 CURSOR GLOW
// ══════════════════════════════════════
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

// ══════════════════════════════════════
// 🎈 FLOATING EMOJIS IN HERO
// ══════════════════════════════════════
const heroEl = document.querySelector('.hero');
const floatEmojis = ['🎈','🎉','✨','🔫','🏰','🎊','💫','🎁','🪅','🎶'];
if (heroEl) {
  for (let i = 0; i < 14; i++) {
    const span = document.createElement('span');
    span.className = 'floating-emoji';
    span.textContent = floatEmojis[i % floatEmojis.length];
    const size = 1.2 + Math.random() * 1.2;
    span.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: -60px;
      font-size: ${size}rem;
      animation-duration: ${7 + Math.random() * 10}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    heroEl.appendChild(span);
  }
}

// ══════════════════════════════════════
// 🌊 SCROLL REVEAL (Intersection Observer)
// ══════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function setupReveal() {
  const selectors = [
    '.service-card', '.trust-card', '.review-card', '.about-card',
    '.pkg-card', '.area-group', '.faq-item',
    '.section-header', '.mvp-statement', '.services-special-note',
    '.catalog-footer-note', '.area-cta-note', '.quote-left', '.quote-right'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      const delay = Math.min(i * 0.08, 0.6);
      el.style.transitionDelay = delay + 's';
      revealObserver.observe(el);
    });
  });
}
setupReveal();

// ══════════════════════════════════════
// 📍 ACTIVE NAV ON SCROLL
// ══════════════════════════════════════
const navSections = ['services','catalog','packages','quote','about','area','faq','contact'];
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.classList.toggle('nav-active', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.35 });
navSections.forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

// ══════════════════════════════════════
// 🃏 3D CARD TILT
// ══════════════════════════════════════
function addTilt(selector) {
  document.addEventListener('mousemove', e => {
    document.querySelectorAll(selector).forEach(card => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 220) {
        const rx = -(dy / rect.height) * 10;
        const ry =  (dx / rect.width)  * 10;
        card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        card.style.boxShadow = `0 20px 48px rgba(255,107,53,.22)`;
      } else {
        card.style.transform = '';
        card.style.boxShadow = '';
      }
    });
  });
}
addTilt('.catalog-card');

// ══════════════════════════════════════
// 🦸 HERO PARALLAX BLOBS
// ══════════════════════════════════════
const blob1 = document.querySelector('.hero-blob-1');
const blob2 = document.querySelector('.hero-blob-2');
const blob3 = document.querySelector('.hero-blob-3');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (blob1) blob1.style.transform = `translateY(${y * 0.25}px)`;
  if (blob2) blob2.style.transform = `translateY(${y * -0.15}px)`;
  if (blob3) blob3.style.transform = `translate(-50%, calc(-50% + ${y * 0.1}px))`;
}, { passive: true });

// ══════════════════════════════════════
// 🎊 CONFETTI BURST
// ══════════════════════════════════════
const canvas = document.createElement('canvas');
canvas.id = 'confetti-canvas';
document.body.appendChild(canvas);

function launchConfetti(x, y) {
  try {
    const canvasEl = document.getElementById('confetti-canvas');
    if (!canvasEl || typeof confetti === 'undefined') return;

    const rect = canvasEl.getBoundingClientRect();
    confetti({
      particleCount: 60,
      spread: 65,
      origin: {
        x: x ? x / rect.width : 0.5,
        y: y ? y / rect.height : 0.5
      }
    });
  } catch (e) {
    // fail silently
  }
}

// ══════════════════════════════════════
// ⚡ NERF WARS SPECIAL TREATMENT
// ══════════════════════════════════════
const nerfCard = document.querySelector('.service-card[data-cat="nerf"]');
if (nerfCard) {
  nerfCard.classList.add('nerf-pulse');
  const badge = document.createElement('div');
  badge.innerHTML = '<span class="nerf-live-badge">🔥 LIVE</span>';
  nerfCard.appendChild(badge);
}

// ══════════════════════════════════════
// 🧭 NAVBAR SCROLL STATE MANAGER (FIXED)
// ══════════════════════════════════════
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    // Simply toggle the class at 20px of scroll; let CSS handle the premium transition
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}
// ══════════════════════════════════════
// 🍔 MOBILE HAMBURGER
// ══════════════════════════════════════
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!open));
    mobileMenu.classList.toggle('open');
  });
}
if (mobileMenu) {
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("open");
    });
  });
}

// ══════════════════════════════════════
// ⌨️ HERO TYPED ANIMATION
// ══════════════════════════════════════
const phrases = ['Unforgettable.', 'Amazing.', 'Special.', 'Stress-Free.', 'Yours.'];
let pi = 0, ci = 0, deleting = false;
const heroTyped = document.getElementById('heroTyped');
function typeLoop() {
  if (!heroTyped) return;
  const word = phrases[pi];
  if (!deleting) {
    heroTyped.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
  } else {
    heroTyped.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi+1) % phrases.length; setTimeout(typeLoop, 300); return; }
  }
  setTimeout(typeLoop, deleting ? 45 : 75);
}
typeLoop();

// ══════════════════════════════════════
// 🔢 STAT COUNTERS (scroll-triggered)
// ══════════════════════════════════════
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 50));
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur + (el.dataset.suffix || '');
        if (cur >= target) clearInterval(t);
      }, 28);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => statObserver.observe(el));

// ══════════════════════════════════════
// 🗂️ CATALOG RENDER — SCROLLABLE SECTION
// ══════════════════════════════════════
let activeFilter = 'all';
let catalogSearchTerm = '';
let currentSort = 'relevance';

function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;

  let items = CATALOG;

  if (activeFilter && activeFilter !== 'all') {
    items = items.filter(i => i.cat === activeFilter);
  }

  if (catalogSearchTerm) {
    const q = catalogSearchTerm.toLowerCase();
    items = items.filter(i =>
      i.name.toLowerCase().includes(q) ||
      i.catLabel.toLowerCase().includes(q) ||
      (i.desc && i.desc.toLowerCase().includes(q))
    );
  }

  if (currentSort === 'priceLowHigh') {
    items = [...items].sort((a, b) => a.priceLow - b.priceLow);
  } else if (currentSort === 'priceHighLow') {
    items = [...items].sort((a, b) => b.priceLow - a.priceLow);
  }

  grid.innerHTML = items
    .map((item, idx) => `
      <div class="catalog-card" data-id="${item.id}" tabindex="0" style="cursor:pointer;animation-delay:${Math.min(idx*0.04,0.5)}s">
        <div class="catalog-card-img-wrap">
          <img class="catalog-card-img" src="${item.img}" alt="${item.name}"
            onerror="this.parentElement.innerHTML='<div style=\\'font-size:2.2rem;display:flex;align-items:center;justify-content:center;width:100%;height:100%\\'>${item.emoji}</div>'" loading="lazy"/>
        </div>
        <div class="catalog-card-body">
          <div class="catalog-card-cat">${item.catLabel}</div>
          <div class="catalog-card-name">${item.name}</div>
          <div class="catalog-card-price"><strong>$${item.priceLow}–$${item.priceHigh}</strong> / event</div>
          <button class="catalog-card-add" data-id="${item.id}">+ Add to Quote</button>
        </div>
      </div>
    `)
    .join('');

  grid.querySelectorAll('.catalog-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.classList.contains('catalog-card-add')) return;
      openModal(+card.dataset.id);
    });
  });

  grid.querySelectorAll('.catalog-card-add').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = +btn.dataset.id;
      addToQuote(id);
      const r = btn.getBoundingClientRect();
      launchConfetti(r.left + r.width / 2, r.top + r.height / 2);

      const originalText = btn.textContent;
      btn.textContent = '✅ Added!';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1200);
    });
  });
}

renderCatalog();

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter || 'all';
    renderCatalog();
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const catalogSearch = document.getElementById('catalogSearch');
if (catalogSearch) {
  catalogSearch.addEventListener('input', e => {
    catalogSearchTerm = e.target.value.trim();
    renderCatalog();
  });
}

const catalogSort = document.getElementById('catalogSort');
if (catalogSort) {
  catalogSort.addEventListener('change', e => {
    currentSort = e.target.value || 'relevance';
    renderCatalog();
  });
}

document.querySelectorAll('.service-card[data-cat]').forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault();
    const cat = card.dataset.cat;
    activeFilter = cat;
    catalogSearchTerm = '';
    if (catalogSearch) catalogSearch.value = '';

    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === cat);
    });

    renderCatalog();
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ══════════════════════════════════════
// 🔍 MODAL
// ══════════════════════════════════════
let currentModalItem = null;
const modalQtyInput = document.getElementById('modalQtyInput');
const modalAddBtn = document.getElementById('modalAddBtn');

function openModal(id) {
  const item = CATALOG.find(i => i.id === id);
  if (!item) return;
  
  currentModalItem = item;
  document.getElementById('modalCat').textContent   = item.catLabel;
  document.getElementById('modalTitle').textContent = item.name;
  document.getElementById('modalPrice').textContent = `$${item.priceLow} – $${item.priceHigh} / event`;
  document.getElementById('modalDesc').textContent  = item.desc;
  
  const img = document.getElementById('modalImg');
  img.src = item.img; img.alt = item.name;

  if (modalQtyInput) modalQtyInput.value = 1;

  document.getElementById('catalogModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('catalogModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modalClose')?.addEventListener('click', closeModal);
document.getElementById('modalOverlay')?.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

if (modalAddBtn) {
  modalAddBtn.addEventListener('click', () => {
    if (!currentModalItem) return;

    let qty = parseInt(modalQtyInput.value, 10);
    if (isNaN(qty) || qty < 0) qty = 0;

    if (qty === 0) {
      delete quoteState[currentModalItem.id];
    } else {
      addToQuote(currentModalItem.id, qty);
    }
    
    updateQuoteSummary();
    launchConfetti();

    const originalText = modalAddBtn.textContent;
    modalAddBtn.textContent = '✅ Added!';
    modalAddBtn.disabled = true;
    setTimeout(() => {
      modalAddBtn.textContent = originalText;
      modalAddBtn.disabled = false;
    }, 1200);
  });
}

document.querySelectorAll('.modal-qty-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!modalQtyInput) return;
    const action = btn.dataset.action;
    let val = parseInt(modalQtyInput.value, 10);
    if (isNaN(val) || val < 0) val = 0;

    if (action === 'inc') val++;
    if (action === 'dec') val = Math.max(0, val - 1);

    modalQtyInput.value = val;
  });
});

if (modalQtyInput) {
  modalQtyInput.addEventListener('input', (e) => {
    if (e.target.value === '') return;
    let val = parseInt(e.target.value, 10);
    if (val < 0) e.target.value = 0;
  });
  modalQtyInput.addEventListener('change', (e) => {
    if (e.target.value === '' || parseInt(e.target.value, 10) < 0) {
      e.target.value = 0;
    }
  });
}

// ══════════════════════════════════════
// 💰 QUOTE BUILDER
// ══════════════════════════════════════
let quoteSearchInputTerm = '';

function renderQuoteItems() {
  const list = document.getElementById('quoteItemsList');
  if (!list) return;

  const term = quoteSearchInputTerm.toLowerCase();

  const filtered = CATALOG.filter(item => {
    if (!term) return true;
    return (
      item.name.toLowerCase().includes(term) ||
      item.catLabel.toLowerCase().includes(term) ||
      (item.desc && item.desc.toLowerCase().includes(term))
    );
  });

  const byCat = {};
  filtered.forEach(item => {
    if (!byCat[item.cat]) byCat[item.cat] = [];
    byCat[item.cat].push(item);
  });

  const catOrder = [
    'seating','tables','tents','linens','decor','lighting','inflatables',
    'nerf','photo','yard','concession','audio','highticket','lounge','essentials'
  ];
  const orderedCats = catOrder.filter(c => byCat[c]);

  list.innerHTML = orderedCats.map(catKey => {
    const items = byCat[catKey];
    const catLabel = items[0].catLabel || catKey;

    const rows = items.map(item => {
      const qty = quoteState[item.id] || 0;
      return `
        <div class="quote-item-row" data-id="${item.id}">
          <div class="qir-info">
            <div class="qir-name">${item.emoji} ${item.name}</div>
            <div class="qir-price">$${item.priceLow}–$${item.priceHigh} / event</div>
          </div>
          <div class="qir-qty">
            <button class="qir-btn" data-action="dec">−</button>
            <input type="number" class="qir-input" data-id="${item.id}" value="${qty}" min="0" />
            <button class="qir-btn" data-action="inc">+</button>
          </div>
        </div>`;
    }).join('');

    return `
      <div class="quote-cat-group">
        <div class="quote-cat-header">${catLabel}</div>
        ${rows}
      </div>`;
  }).join('');

  list.querySelectorAll('.qir-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.quote-item-row');
      const id = +row.dataset.id;
      let current = quoteState[id] || 0;

      if (btn.dataset.action === 'inc') {
        quoteState[id] = current + 1;
      } else {
        quoteState[id] = Math.max(current - 1, 0);
        if (!quoteState[id]) delete quoteState[id];
      }
      renderQuoteItems();
      updateQuoteSummary();
    });
  });

  list.querySelectorAll('.qir-input').forEach(input => {
    input.addEventListener('change', () => {
      const row = input.closest('.quote-item-row');
      const id = +row.dataset.id;
      let val = parseInt(input.value, 10);
      if (isNaN(val) || val < 0) val = 0;

      if (val === 0) {
        delete quoteState[id];
      } else {
        quoteState[id] = val;
      }
      renderQuoteItems();
      updateQuoteSummary();
    });
  });

  list.querySelectorAll('.quote-item-row .qir-info').forEach(info => {
    info.addEventListener('click', () => {
      const parent = info.closest('.quote-item-row');
      const id = parent ? +parent.dataset.id : null;
      if (id) openModal(id);
    });
  });
}

function addToQuote(id, qty = 1) {
  const amount = Math.max(1, qty);
  quoteState[id] = (quoteState[id] || 0) + amount;
  renderQuoteItems();
  updateQuoteSummary();
}

function updateQuoteSummary() {
  const selectedList = document.getElementById('quoteSelectedList');
  const empty        = document.getElementById('quoteEmpty');
  const rangeBox     = document.getElementById('quoteRangeBox');
  const formWrap     = document.getElementById('quoteFormWrap');
  const keys = Object.keys(quoteState).filter(k => quoteState[k] > 0);

  let emailString = "--- CLIENT QUOTE REQUEST ---\n\n";

  if (!keys.length) {
    if(empty) empty.style.display      = 'block';
    if(selectedList) selectedList.innerHTML   = '';
    if(rangeBox) rangeBox.style.display   = 'none';
    if(formWrap) formWrap.style.display   = 'none';
    updateProgressBar(0);
    updateMiniQuoteBar({ count: 0, totalLow: 0, totalHigh: 0 });
    
    const qfSelectedItems = document.getElementById('qfSelectedItems');
    if(qfSelectedItems) qfSelectedItems.value = "";
    return;
  }
  
  if(empty) empty.style.display    = 'none';
  if(rangeBox) rangeBox.style.display = 'block';
  if(formWrap) formWrap.style.display = 'block';
  let totalLow = 0, totalHigh = 0;

  if (selectedList) {
    selectedList.innerHTML = keys.map(k => {
      const item = CATALOG.find(i => i.id === +k);
      if(!item) return '';
      const qty  = quoteState[k];
      totalLow  += item.priceLow  * qty;
      totalHigh += item.priceHigh * qty;
      
      emailString += `• ${qty}x ${item.name} ($${item.priceLow}-$${item.priceHigh} ea)\n`;

      return `
        <div class="qsl-row" data-id="${item.id}">
          <span>${item.emoji} ${item.name}</span>
          <div class="qsl-row-bottom">
            <div class="qir-qty">
              <button class="qir-btn" data-action="dec">−</button>
              <input type="number" class="qir-input" data-id="${item.id}" value="${qty}" min="0" />
              <button class="qir-btn" data-action="inc">+</button>
            </div>
            <span class="qsl-price">$${Math.round(item.priceLow*qty)}–$${Math.round(item.priceHigh*qty)}</span>
          </div>
        </div>`;
    }).join('');

    selectedList.querySelectorAll('.qir-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const row   = btn.closest('.qsl-row');
        const id    = +row.dataset.id;
        const input = row.querySelector('.qir-input');
        let val     = parseInt(input.value, 10);
        if (isNaN(val) || val < 0) val = 0;

        if (btn.dataset.action === 'inc') val++;
        if (btn.dataset.action === 'dec') val = Math.max(0, val - 1);

        if (val === 0) {
          delete quoteState[id];
        } else {
          quoteState[id] = val;
        }
        renderQuoteItems();
        updateQuoteSummary();
      });
    });

    selectedList.querySelectorAll('.qir-input').forEach(input => {
      input.addEventListener('change', () => {
        const id = +input.dataset.id;
        let val  = parseInt(input.value, 10);
        if (isNaN(val) || val < 0) val = 0;

        if (val === 0) {
          delete quoteState[id];
        } else {
          quoteState[id] = val;
        }
        renderQuoteItems();
        updateQuoteSummary();
      });
    });
  }

  const countEl = document.getElementById('qItemCount');
  if(countEl) countEl.textContent   = keys.length;
  const rangeEl = document.getElementById('qRangeOutput');
  if(rangeEl) rangeEl.textContent = `$${Math.round(totalLow)} – $${Math.round(totalHigh)}`;

  const progress = Math.min((totalLow / 500) * 100, 100);
  updateProgressBar(progress);

  updateMiniQuoteBar({
    count: keys.length,
    totalLow: Math.round(totalLow),
    totalHigh: Math.round(totalHigh)
  });

  emailString += `\nESTIMATED TOTAL: $${Math.round(totalLow)} - $${Math.round(totalHigh)}`;
  const qfSelectedItems = document.getElementById('qfSelectedItems');
  if(qfSelectedItems) qfSelectedItems.value = emailString;
}

function updateProgressBar(pct) {
  const fill = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');
  if (fill) fill.style.width = pct + '%';
  if (label) {
    if (pct < 30)       label.textContent = '🛒 Just getting started!';
    else if (pct < 60)  label.textContent = '🔥 Looking good!';
    else if (pct < 100) label.textContent = '🎉 Almost a full party!';
    else                label.textContent = '🏆 Full party package!';
  }
}

renderQuoteItems();

const quoteSearch = document.getElementById('quoteSearch');
if (quoteSearch) {
  quoteSearch.addEventListener('input', e => {
    quoteSearchInputTerm = e.target.value;
    renderQuoteItems();
  });
}

// ══════════════════════════════════════
// ❓ FAQ ACCORDION
// ══════════════════════════════════════
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded','false');
      b.nextElementSibling.classList.remove('open');
      b.querySelector('span').textContent = '+';
    });
    if (!expanded) {
      btn.setAttribute('aria-expanded','true');
      btn.nextElementSibling.classList.add('open');
      btn.querySelector('span').textContent = '−';
    }
  });
});

// ══════════════════════════════════════
// 📬 WEB3FORMS HANDLING (QUOTES & CONTACT)
// ══════════════════════════════════════
function handleWeb3Form(formElement, successElement) {
  if (!formElement) return;
  
  formElement.addEventListener('submit', async function(e) {
    e.preventDefault(); 
    
    const submitBtn = formElement.querySelector('button[type="submit"]') || document.getElementById('submitQuote');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(formElement);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        if (formElement.id === 'customQuoteForm') {
          const wrap = document.getElementById('quoteFormWrap');
          const rangeBox = document.getElementById('quoteRangeBox');
          const selList = document.getElementById('quoteSelectedList');
          if(wrap) wrap.style.display = 'none';
          if(rangeBox) rangeBox.style.display = 'none';
          if(selList) selList.innerHTML = '';
        } else {
          formElement.style.display = 'none';
        }
        
        if(successElement) successElement.style.display = 'block';
        if (typeof launchConfetti === 'function') launchConfetti();
      } else {
        alert("Error: " + data.message);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error sending your form. Please try again!');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Hook up the Quote Form
const customQuoteForm = document.getElementById('customQuoteForm');
const quoteSuccess = document.getElementById('quoteSuccess');
if (customQuoteForm && quoteSuccess) handleWeb3Form(customQuoteForm, quoteSuccess);

// Hook up the Contact Form
const mainContactForm = document.getElementById('mainContactForm');
const formSuccess = document.getElementById('formSuccess');
if (mainContactForm && formSuccess) handleWeb3Form(mainContactForm, formSuccess);

// ══════════════════════════════════════
// 🛒 STICKY MINI QUOTE BAR
// ══════════════════════════════════════
const miniQuoteBar  = document.getElementById('miniQuoteBar');
const miniQuoteText = document.getElementById('miniQuoteText');

function updateMiniQuoteBar({ count, totalLow, totalHigh }) {
  if (!miniQuoteBar || !miniQuoteText) return;

  if (!count || count === 0) {
    miniQuoteBar.classList.add('mini-quote-empty');
    miniQuoteText.textContent = 'Your quote is empty';
  } else {
    miniQuoteBar.classList.remove('mini-quote-empty');
    miniQuoteText.textContent = `${count} item${count > 1 ? 's' : ''} · $${totalLow}–$${totalHigh}`;
  }
}

// Initial state
updateMiniQuoteBar({ count: 0, totalLow: 0, totalHigh: 0 });

if (miniQuoteBar) {
  miniQuoteBar.addEventListener('click', () => {
    const quoteSection = document.getElementById('quote');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// ══════════════════════════════════════
// 🎁 SMOOTH PROMO MODAL LOGIC
// ══════════════════════════════════════
document.addEventListener("DOMContentLoaded", function() {
  const promoModal = document.getElementById('promoModal');
  const promoCloseBtn = document.getElementById('promoModalClose');
  const promoLinks = document.querySelectorAll('.promo-link');

  // Open modal smoothly after 2 seconds
  if (promoModal) {
    setTimeout(function() {
      promoModal.classList.add('show-modal');
    }, 2000);
  }

  // Close modal smoothly function
  function closePromoModal() {
    if (promoModal) {
      promoModal.classList.remove('show-modal');
    }
  }

  // Close triggers
  if (promoCloseBtn) {
    promoCloseBtn.addEventListener('click', closePromoModal);
  }
  
  if (promoModal) {
    promoModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closePromoModal();
      }
    });
  }

  promoLinks.forEach(link => {
    link.addEventListener('click', closePromoModal);
  });
});


// --- MODAL CLICK-OUTSIDE & X BUTTON FIX ---
document.addEventListener('click', function(e) {
  // If you click the dark background overlay (not the white box)
  if (e.target.classList.contains('modal-overlay') || e.target.id === 'catalogModal') {
    if (typeof closeModal === 'function') closeModal();
  }
  // If you click the X button
  if (e.target.closest('.modal-close')) {
    if (typeof closeModal === 'function') closeModal();
  }
});





// ════════════ PRODUCTION GALLERY ENGINE ════════════
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".gallery-filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener("click", function () {
        // Handle active class styling
        filterButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        const activeFilter = this.getAttribute("data-filter");

        // Filter items
        galleryItems.forEach(item => {
          if (activeFilter === "all" || item.classList.contains(activeFilter)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }
});

// Lightbox controller operations
function openGalleryLightbox(element) {
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("galleryLightboxImg");
  const lightboxCaption = document.getElementById("galleryLightboxCaption");
  const targetImg = element.querySelector("img");

  if (lightbox && targetImg) {
    lightboxImg.src = targetImg.src;
    lightboxCaption.textContent = targetImg.alt;
    lightbox.style.display = "flex";
  }
}

function closeGalleryLightbox() {
  const lightbox = document.getElementById("galleryLightbox");
  if (lightbox) {
    lightbox.style.display = "none";
  }
}