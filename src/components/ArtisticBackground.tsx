import React from 'react';

export const ArtisticBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#FFF9FA] overflow-x-hidden selection:bg-pink-100 selection:text-pink-900 font-['Hind_Siliguri',sans-serif]">
      
      {/* 1. Soft Ambient Pastel Pink & Peach Atmospheric Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Soft Rose Glow in top-right */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-200/25 via-rose-100/15 to-transparent blur-3xl" />
        
        {/* Soft Lavender Glow in middle-left */}
        <div className="absolute top-[35%] -left-36 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-purple-100/20 via-pink-100/15 to-transparent blur-3xl" />
        
        {/* Soft Warm Peach in bottom */}
        <div className="absolute bottom-10 right-[10%] w-[480px] h-[480px] rounded-full bg-gradient-to-tl from-amber-100/20 via-rose-100/15 to-transparent blur-3xl" />
      </div>

      {/* 2. Ultra-Subtle Spacious Messenger-Style Pattern Wallpaper (340px x 340px Repeating Tile, 16% Opacity) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.16]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='340' height='340' viewBox='0 0 340 340' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3C!-- 1. Smiling Open Book --%3E%3Cpath d='M35 48C35 45.5 37 43 40 43H52C53.5 43 55 44.5 55 46V68C55 68 53.5 66.5 49 66.5H40C37 66.5 35 64.5 35 62V48Z' stroke='%23FB7185' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round' fill='%23FFE4E6'/%3E%3Cpath d='M75 48C75 45.5 73 43 70 43H58C56.5 43 55 44.5 55 46V68C55 68 56.5 66.5 61 66.5H70C73 66.5 75 64.5 75 62V48Z' stroke='%23FB7185' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round' fill='%23FFE4E6'/%3E%3Ccircle cx='45' cy='54' r='0.8' fill='%23E11D48'/%3E%3Ccircle cx='51' cy='54' r='0.8' fill='%23E11D48'/%3E%3Cpath d='M47 58C47.5 59 48.5 59 49 58' stroke='%23E11D48' stroke-width='0.8' stroke-linecap='round'/%3E%3C!-- 2. Twinkling Pastel Star --%3E%3Cpath d='M175 35L177 42L184 44L177 46L175 53L173 46L166 44L173 42L175 35Z' fill='%23F472B6' stroke='%23FB7185' stroke-width='0.8' stroke-linejoin='round'/%3E%3C!-- 3. Cute Boba Cup --%3E%3Cpath d='M275 45H295L291 72C290.5 74.5 288.5 76.5 286 76.5H284C281.5 76.5 279.5 74.5 279 72L275 45Z' stroke='%23C084FC' stroke-width='1.2' stroke-linejoin='round' fill='%23F3E8FF'/%3E%3Cpath d='M273 45H297' stroke='%23C084FC' stroke-width='1.2' stroke-linecap='round'/%3E%3Cline x1='285' y1='35' x2='285' y2='45' stroke='%23FB7185' stroke-width='1.5' stroke-linecap='round'/%3E%3Ccircle cx='282' cy='66' r='1.2' fill='%239333EA'/%3E%3Ccircle cx='288' cy='68' r='1.2' fill='%239333EA'/%3E%3C!-- 4. Cute Little Pencil --%3E%3Cpath d='M45 155L58 142L66 150L53 163L42 166L45 155Z' fill='%23FDE047' stroke='%23F59E0B' stroke-width='1.2' stroke-linejoin='round'/%3E%3Cpath d='M58 142L61 139C62.5 137.5 65 137.5 66.5 139L69 141.5C70.5 143 70.5 145.5 69 147L66 150L58 142Z' fill='%23FDA4AF' stroke='%23FB7185' stroke-width='1'/%3E%3C!-- 5. Kawaii Computer Monitor --%3E%3Crect x='200' y='140' width='36' height='26' rx='4' fill='%23E0E7FF' stroke='%23818CF8' stroke-width='1.2'/%3E%3Cpath d='M212 166H224L227 172H209L212 166Z' fill='%23C7D2FE' stroke='%23818CF8' stroke-width='1' stroke-linejoin='round'/%3E%3Ccircle cx='211' cy='151' r='1.2' fill='%234F46E5'/%3E%3Ccircle cx='225' cy='151' r='1.2' fill='%234F46E5'/%3E%3Cpath d='M216 156C217 157.5 219 157.5 220 156' stroke='%234F46E5' stroke-width='1' stroke-linecap='round'/%3E%3C!-- 6. Tiny Graduation Cap --%3E%3Cpolygon points='295,205 315,211 295,217 275,211' fill='%23818CF8' stroke='%236366F1' stroke-width='1' stroke-linejoin='round'/%3E%3Cpath d='M282 214V220C282 222 288 224 295 224C302 224 308 222 308 220V214' stroke='%236366F1' stroke-width='1' fill='%23C7D2FE'/%3E%3Cpath d='M310 212.5V222' stroke='%23FBBF24' stroke-width='1.2' stroke-linecap='round'/%3E%3C!-- 7. Cute Cloud Puff --%3E%3Cpath d='M50 260H74C78 260 81 257 81 253C81 249 78 246 74 246C73 242 69 239 65 239C61 239 57 241 56 245C55 245 53 245 52 245C48 245 45 248 45 252C45 256 47 260 50 260Z' fill='%23BAE6FD' stroke='%2338BDF8' stroke-width='1'/%3E%3C!-- 8. Kawaii Saturn Planet --%3E%3Ccircle cx='170' cy='245' r='11' fill='%23FED7AA' stroke='%23FB923C' stroke-width='1.2'/%3E%3Cellipse cx='170' cy='245' rx='19' ry='4.5' fill='none' stroke='%23F472B6' stroke-width='1.2' transform='rotate(-18 170 245)'/%3E%3Ccircle cx='167' cy='244' r='0.8' fill='%239A3412'/%3E%3Ccircle cx='173' cy='244' r='0.8' fill='%239A3412'/%3E%3Cpath d='M169 248C169.5 249 170.5 249 171 248' stroke='%239A3412' stroke-width='0.7' stroke-linecap='round'/%3E%3C!-- 9. Code Bracket Box --%3E%3Crect x='115' y='300' width='30' height='20' rx='4' fill='%23A7F3D0' stroke='%2334D399' stroke-width='1.2'/%3E%3Cpath d='M122 307L120 310L122 313' stroke='%23065F46' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M138 307L140 310L138 313' stroke='%23065F46' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cline x1='132' y1='305' x2='128' y2='315' stroke='%23065F46' stroke-width='1.2' stroke-linecap='round'/%3E%3C!-- 10. Cute Lightbulb of Idea --%3E%3Cpath d='M275 295C270 295 266 299 266 304C266 307 268 310 270 311.5V315C270 316 271 317 272 317H278C279 317 280 316 280 315V311.5C282 310 284 307 284 304C284 299 280 295 275 295Z' fill='%23FEF08A' stroke='%23EAB308' stroke-width='1'/%3E%3Cline x1='271' y1='319' x2='279' y2='319' stroke='%2394A3B8' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '340px 340px'
        }}
        aria-hidden="true" 
      />

      {/* 3. Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};
