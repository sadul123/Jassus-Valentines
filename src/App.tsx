import { useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";


/**
 * App = your main page component.
 * We'll build it up step-by-step.
 */
export default function App() {
  const [page, setPage] = useState<1 | 2 | 3 | 4 | 5>(1);

  

  // Counts how many times the "No" button dodged
  const [dodges, setDodges] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  

  const base = import.meta.env.BASE_URL;

  const finalImages = [
    `${base}JS_1.jpg`,
    `${base}JS_2.jpg`,
    `${base}JS_3.jpg`,
    `${base}JS_4.jpg`,
    `${base}JS_5.jpg`,
    `${base}JS_6.jpg`,
  ];

  // Audio references
  const mainAudio = useMemo(() => new Audio(`${base}GoodnightSweetPossums.mp3`), [base]);
  const finalAudio = useMemo(() => new Audio(`${base}TumSeHi.mp3`), [base]);

  const [musicStarted, setMusicStarted] = useState(false);

  // This function runs when they hover the "No" button
  const onNoHover = () => {
  // Increase the dodge counter
  setDodges((d) => d + 1);

  // Helper function to generate a random integer between min and max
  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  

  // Update the button's position state
  setNoPos({
    x: rand(-140, 140),
    y: rand(-90, 90),
   });

  useEffect(() => {
    if (page !== 4) return;
      // Preload Page 5 images while the GIF is showing
      finalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [page, finalImages]);

  useEffect(() => {
    mainAudio.loop = true;
    finalAudio.loop = true;

    mainAudio.volume = 0.35;
    finalAudio.volume = 0.35;
  }, [mainAudio, finalAudio]);


  };
  useEffect(() => {
    // Only switch if the user has started music already
    if (!musicStarted) return;

      if (page === 5) {
        mainAudio.pause();
        mainAudio.currentTime = 0;

        finalAudio.play().catch(() => {});
      } else {
        finalAudio.pause();
        finalAudio.currentTime = 0;

        mainAudio.play().catch(() => {});
      }
    }, [page, musicStarted, mainAudio, finalAudio]);

  
  return (
    <div 
      onClick={() => {
        if (!musicStarted) {
          mainAudio.play().catch(() => {});
          setMusicStarted(true);
        }
      }}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-pink-500 to-purple-500 px-4"
    >
      <div 
      key={page}
      className="w-full max-w-4xl rounded-3xl bg-white p-4 shadow-xl text-center opacity-0 [animation:pageFadeIn_450ms_ease-out_forwards]"
      >
        {page === 1 && (
          <div>
            <h1 className="text-4xl font-bold text-red-600">For Jassu 🐭</h1>

            <p className="mt-2 text-lg text-red-600 font-medium">From Sadul 🐼</p>

            <p className="mt-6 text-xl font-semibold text-red-500">
              I have an important question for you…
            </p>

            < button
              onClick={() => setPage(2)}
              className="mt-8 rounded-2xl bg-rose-500 px-6 py-3 text-white font-medium shadow-md hover:opacity-95 active:scale-[0.99]"
            >
              Open it
            </button>
          </div>
        )}

        {page === 2 && (
          <div>
            <h1 className="text-4xl font-bold text-red-600">Will you be my Valentine?</h1>

            <p className="mt-3 text-gray-600">
              Dodges: <span className="font-semibold">{dodges}</span>
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  // Confetti for 2 seconds
                  const duration = 2000;
                  const end = Date.now() + duration;

                  const interval = setInterval(() => {
                    if (Date.now() > end) {
                      clearInterval(interval);
                    return;
                  }

                  confetti({
                    particleCount: 40,
                    spread: 70,
                    origin: {
                      x: Math.random(),
                      y: Math.random() - 0.2,
                    },
                  });
                }, 250);

                setPage(3);
              }}
              className="rounded-2xl bg-rose-500 px-6 py-3 text-white font-medium shadow-md hover:opacity-95 active:scale-[0.99]"
            >
              Yes 💘
            </button>

            <button
              onPointerEnter={onNoHover}   // works for mouse + touch + pen
              onPointerDown={onNoHover}    // triggers when they tap it
              onTouchStart={onNoHover}     // extra safety for some mobile browsers
              style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
              className="rounded-2xl border border-pink-200 bg-white px-6 py-3 font-medium shadow-sm transition-transform"
            >
              No 🙃
            </button>
           </div>
         </div>
       )}

       {page === 3 && (
        <div className="rounded-2xl bg-pink-50 p-8">
          <p className="text-4xl font-semibold text-red-600">You just made me the happiest person ever🥰</p>
          <p className="mt-4 text-2xl text-red-500 font-medium">Here's a little hug cutie</p>
           {/* Effect selector buttons */}
         
          <img
            src={`${base}milkmochabear.png`}
            alt="Celebration"
            className="mt-6 mx-auto rounded-2xl shadow-lg w-68 opacity-0 [animation:popIn_500ms_ease-out_forwards]"
          />
    
          <button
            onClick={() => {
              setPage(4);
            }}
            className="mt-6 rounded-2xl bg-rose-500 px-6 py-3 text-white font-medium shadow-md hover:opacity-95 active:scale-[0.99]"
          >
            But wait......There's more 😉
          </button>  
        </div>
      )}

      {page === 4 && (
        <div className="rounded-3xl bg-pink-50 p-1">
          <p className="text-2xl font-bold text-red-600">
            Here's a kiss my puppy, from your kitty... and a few memories 😄
          </p>
          <div className="mt-6">
            <img
              src={`${base}catkiss.gif`}
              alt="Cute moment"
              className="mx-auto rounded-2xl shadow-lg w-200"
            />
          </div>

          <button
            onClick={() => setPage(5)}
            className="mt-6 rounded-2xl bg-rose-500 px-6 py-3 text-white font-medium shadow-md hover:opacity-95 active:scale-[0.99]"
          >
            Unlock Memories 💗
          </button>
       </div>
      )}

      {page === 5 && (
        <div className="rounded-2xl bg-pink-50 p-5">
          <p className="text-4xl font-bold text-red-600">
            Happy Valentine’s Day My Sweetu 💖
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {finalImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Memory"
              className="rounded-2xl shadow-lg w-52 max-h-52 object-cover bg-white opacity-0 [animation:popIn_600ms_ease-out_forwards]"
            />
            ))}
          </div>

          <button
            onClick={() => setPage(1)}
            className="mt-6 rounded-2xl border border-pink-200 bg-white px-6 py-3 font-medium shadow-sm"
          >
            Back to start
          </button>
        </div>
      )}

      </div>
        <FloatingHearts />
      </div>
    );
  }
function FloatingHearts() {
  // Different emojis we’ll randomly choose from
  const emojis = ["💖", "💜", "🐹", "🐭", "🐼", "👫", "🥰"];

  // Create 12 floating emojis with random properties
  const hearts =  useMemo(() => {
   return Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: Math.random() * 90 + 5,     // 5% to 95% width
    size: Math.random() * 22 + 20,    // 14px to 32px
    duration: Math.random() * 6 + 6,  // 6s to 12s animation
    delay: Math.random() * 2,         // 0s to 2s delay
    opacity: Math.random() * 0.4 + 0.7,
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
  }));
 }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            bottom: "-10%",
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animation: `floatUp ${h.duration}s linear ${h.delay}s infinite`,
          }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  );
}