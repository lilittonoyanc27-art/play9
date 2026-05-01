import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  ArrowRight, 
  Sparkles,
  ShoppingBag,
  CreditCard,
  Crown,
  Wallet,
  Store,
  Tag,
  MessageCircle,
  ThumbsUp,
  XCircle,
  ShoppingBasket,
  BookOpen
} from 'lucide-react';
import { SHOP_DATA, ShopQuestion, COMPRAR_CONJUGATION, PAGAR_CONJUGATION } from './constants';

type GameState = 'start' | 'theory' | 'playing' | 'results';
type Player = 'Gor' | 'Gayane';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState({ Gor: 0, Gayane: 0 });
  const [inventories, setInventories] = useState({ Gor: [] as string[], Gayane: [] as string[] });
  const [currentPlayer, setCurrentPlayer] = useState<Player>('Gor');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [shuffledQuests, setShuffledQuests] = useState<ShopQuestion[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (gameState === 'start') {
      setShuffledQuests([...SHOP_DATA].sort(() => 0.5 - Math.random()));
    }
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setCurrentIndex(0);
    setScores({ Gor: 0, Gayane: 0 });
    setInventories({ Gor: [], Gayane: [] });
    setCurrentPlayer('Gor');
    setFeedback(null);
    setShowExplanation(false);
  };

  const handleAnswer = (answer: string) => {
    if (feedback) return;
    
    const isCorrect = answer === shuffledQuests[currentIndex].correct;
    if (isCorrect) {
      setScores(prev => ({ ...prev, [currentPlayer]: prev[currentPlayer] + 1 }));
      setInventories(prev => ({ 
        ...prev, 
        [currentPlayer]: [...prev[currentPlayer], shuffledQuests[currentIndex].item] 
      }));
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    setFeedback(null);
    setShowExplanation(false);
    if (currentIndex < 14) {
      setCurrentIndex(prev => prev + 1);
      setCurrentPlayer(prev => prev === 'Gor' ? 'Gayane' : 'Gor');
    } else {
      setGameState('results');
    }
  };

  const winner = scores.Gor > scores.Gayane ? 'Gor' : scores.Gayane > scores.Gor ? 'Gayane' : 'Draw';

  return (
    <div className="min-h-screen bg-blue-900 text-slate-100 font-sans flex flex-col overflow-hidden selection:bg-yellow-400 selection:text-blue-900">
      {/* Blue & Yellow Theme Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-800" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-blue-950" />
        <div className="absolute top-[30%] left-[-10%] w-[50%] h-[50%] bg-sky-400/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[100px]" />
      </div>

      <header className="bg-blue-950/80 backdrop-blur-xl border-b-4 border-yellow-500 px-6 py-4 z-50 sticky top-0 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <PlayerStatus 
            name="ԳՈՌ" 
            itemCount={inventories.Gor.length} 
            active={currentPlayer === 'Gor'} 
            color="sky"
          />
          
          <div className="flex flex-col items-center">
            <motion.div 
               animate={{ rotateY: [0, 360] }}
               transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
               className="bg-yellow-500 p-2 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.5)]"
            >
                <Store className="text-blue-900" size={28} />
            </motion.div>
            <span className="text-[10px] font-black uppercase text-yellow-500 mt-2 tracking-[0.2em] bg-blue-900/50 py-1 px-4 rounded-full border border-yellow-500/30">
              ԱՊՐԱՆՔ {currentIndex + 1} / 15
            </span>
          </div>

          <PlayerStatus 
            name="ԳԱՅԱՆԵ" 
            itemCount={inventories.Gayane.length} 
            active={currentPlayer === 'Gayane'} 
            color="yellow"
            textRight
          />
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          {gameState === 'start' && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-12"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotateY: [0, 15, 0, -15, 0],
                    translateY: [0, -20, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 6 }}
                  className="relative z-10"
                >
                  <ShoppingBasket size={140} className="text-yellow-400 drop-shadow-[0_20px_60px_rgba(234,179,8,0.6)]" />
                </motion.div>
                <div className="absolute -inset-20 bg-sky-500/20 rounded-full blur-[100px]" />
              </div>

              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none text-white drop-shadow-md">
                   ԳՆՈՒՄՆԵՐԻ <span className="text-yellow-400 block">ՏԵՆԴ</span>
                </h1>
                <p className="text-sky-300 font-bold uppercase text-sm tracking-[0.5em] bg-blue-950/50 py-2 px-6 rounded-full inline-block border border-sky-500/30">
                  ԳՈՌ VS ԳԱՅԱՆԵ • COMPRAR & PAGAR
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                <button 
                  onClick={() => setGameState('theory')}
                  className="flex-1 py-6 bg-blue-800 border-2 border-sky-400 text-sky-400 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-sky-400 hover:text-blue-900 transition-all shadow-xl"
                >
                  <BookOpen className="inline mr-2" /> Տեսություն
                </button>
                <button 
                  onClick={startGame}
                  className="flex-1 py-6 bg-yellow-500 text-blue-900 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-yellow-400 hover:scale-105 transition-all shadow-[0_20px_40px_rgba(234,179,8,0.3)]"
                >
                  <ArrowRight className="inline mr-2" /> Սկսել
                </button>
              </div>
            </motion.div>
          )}

          {gameState === 'theory' && (
            <motion.div 
              key="theory"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8 py-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ConjugationCard title="Comprar (Գնել)" data={COMPRAR_CONJUGATION} color="sky" />
                <ConjugationCard title="Pagar (Վճարել)" data={PAGAR_CONJUGATION} color="yellow" />
              </div>
              <button 
                onClick={startGame}
                className="w-full py-8 bg-white text-blue-900 rounded-3xl font-black text-2xl uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-2xl flex items-center justify-center gap-4"
              >
                Պատրաստ եմ Մրցույթին <ArrowRight size={32} />
              </button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Player Baskets */}
              <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col gap-8">
                 <PlayerBasket 
                    player="Gor" 
                    items={inventories.Gor} 
                    active={currentPlayer === 'Gor'} 
                    color="sky"
                 />
                 <PlayerBasket 
                    player="Gayane" 
                    items={inventories.Gayane} 
                    active={currentPlayer === 'Gayane'} 
                    color="yellow"
                 />
              </div>

              {/* Center Column: Question Card */}
              <div className="lg:col-span-8 order-1 lg:order-2 space-y-8">
                <motion.div className="bg-white p-10 md:p-14 rounded-[4rem] border-8 border-blue-950 shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                       <ShoppingBasket size={120} className="text-blue-900" />
                    </div>
                    
                    <div className="flex items-center justify-between mb-8 relative z-10">
                       <div className="flex items-center gap-3 bg-blue-100 px-5 py-2 rounded-full border-2 border-blue-200">
                          <Tag size={20} className="text-blue-600" />
                          <span className="text-xl font-black text-blue-900">{shuffledQuests[currentIndex]?.item}</span>
                       </div>
                       <div className="flex items-center gap-2 bg-yellow-100 px-5 py-2 rounded-full border-2 border-yellow-200">
                          <Wallet size={20} className="text-yellow-700" />
                          <span className="text-xl font-black text-yellow-700">${shuffledQuests[currentIndex]?.price}</span>
                       </div>
                    </div>

                    <p className="text-blue-500 font-bold text-sm tracking-widest uppercase mb-4">
                       {shuffledQuests[currentIndex]?.translation}
                    </p>

                    <h2 className="text-4xl md:text-6xl font-black text-blue-950 leading-[1.1] uppercase italic mb-12">
                      {shuffledQuests[currentIndex]?.sentence.split('____').map((part, i) => (
                        <React.Fragment key={i}>
                          {part}
                          {i === 0 && (
                            <span className={`inline-block border-b-8 mx-2 transition-all duration-300 px-4 min-w-[180px] ${feedback ? (feedback === 'correct' ? 'text-green-600 border-green-500' : 'text-red-600 border-red-600') : 'text-blue-200 border-blue-200 border-dashed'}`}>
                              {feedback ? shuffledQuests[currentIndex].correct : '____'}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
                      {shuffledQuests[currentIndex]?.options.map((opt, i) => (
                        <button
                          key={i}
                          disabled={!!feedback}
                          onClick={() => handleAnswer(opt)}
                          className={`
                            py-8 px-4 rounded-[2rem] font-black text-2xl italic uppercase transition-all duration-300 border-4
                            ${feedback && opt === shuffledQuests[currentIndex].correct 
                              ? 'bg-green-600 border-green-400 text-white shadow-xl scale-105' 
                              : feedback && opt !== shuffledQuests[currentIndex].correct
                                ? 'bg-slate-50 border-slate-100 text-slate-300 opacity-40'
                                : 'bg-blue-50 border-blue-100 text-blue-900 hover:border-yellow-500 hover:bg-yellow-50 shadow-md'
                            }
                          `}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                </motion.div>

                <AnimatePresence>
                  {showExplanation && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-10 bg-blue-950 rounded-[3rem] border-4 border-sky-400/30 shadow-2xl relative overflow-hidden"
                    >
                       <div className="flex items-start gap-8">
                          <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-lg ${feedback === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                            {feedback === 'correct' ? <ThumbsUp size={32} /> : <XCircle size={32} />}
                          </div>
                          <div className="flex-1">
                            <p className="font-black text-yellow-400 uppercase text-xs tracking-widest mb-2 opacity-50">Ինչու՞ այսպես</p>
                            <p className="text-white font-bold text-xl leading-relaxed mb-8">{shuffledQuests[currentIndex].explanation}</p>
                            
                            <button 
                              onClick={handleNext}
                              className="group flex items-center justify-center gap-4 bg-yellow-500 text-blue-900 px-14 py-6 rounded-2xl font-black uppercase text-xl tracking-widest transition-all hover:bg-yellow-400 shadow-xl active:scale-95"
                            >
                               ՀԱՋՈՐԴԸ <ArrowRight className="group-hover:translate-x-2 transition-transform" size={28} />
                            </button>
                          </div>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {gameState === 'results' && (
            <motion.div 
              key="results"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-12"
            >
              <div className="relative">
                 <motion.div 
                   animate={{ scale: [1, 1.1, 1] }} 
                   transition={{ repeat: Infinity, duration: 4 }}
                   className={`w-80 h-80 rounded-[6rem] flex items-center justify-center mx-auto shadow-[0_50px_120px_rgba(0,0,0,0.6)] border-8 ${winner === 'Gor' ? 'border-sky-400 bg-blue-800' : winner === 'Gayane' ? 'border-yellow-500 bg-yellow-600' : 'border-slate-500 bg-slate-800'}`}
                 >
                    {winner === 'Draw' ? <Trophy size={160} className="text-white" /> : <Crown size={180} className="text-white" />}
                 </motion.div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-7xl md:text-9xl font-black italic uppercase text-white tracking-tighter leading-none text-shadow-xl">
                  {winner === 'Draw' ? "ՀԱՎԱՍԱՐ" : `${winner === 'Gor' ? 'ԳՈՌԸ' : 'ԳԱՅԱՆԵՆ'} ՀԱՂԹԵՑ`}
                </h2>
                <p className="text-yellow-400 font-bold uppercase tracking-[0.5em] pt-6 bg-blue-900/50 py-3 px-10 rounded-full border border-yellow-500/30">
                  ԽԱՆՈՒԹԸ ԴԱՏԱՐԿՎԵՑ
                </p>
              </div>

              <div className="flex gap-8 justify-center w-full max-w-4xl px-4">
                 <FinalResult player="ԳՈՌ" score={scores.Gor} inventory={inventories.Gor} color="sky" />
                 <FinalResult player="ԳԱՅԱՆԵ" score={scores.Gayane} inventory={inventories.Gayane} color="yellow" />
              </div>

              <button 
                onClick={() => setGameState('start')}
                className="group px-24 py-10 bg-white text-blue-900 rounded-[3rem] font-black text-3xl uppercase tracking-widest hover:bg-yellow-400 transition-all flex items-center justify-center gap-6 shadow-3xl active:scale-95"
              >
                <RotateCcw size={40} className="group-hover:rotate-180 transition-transform duration-700" /> ՎԵՐԱՍԿՍԵԼ
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="px-8 py-10 text-center relative z-10 bg-gradient-to-t from-blue-950 to-transparent">
        <p className="text-yellow-500/30 font-black italic uppercase tracking-[0.5em] text-[10px]">
          BLUE & YELLOW SHOPPING ARENA • 2026
        </p>
      </footer>
    </div>
  );
}

function PlayerStatus({ name, itemCount, active, color, textRight }: any) {
  const isSky = color === 'sky';
  return (
    <div className={`flex items-center gap-6 transition-all duration-700 ${active ? 'scale-110 opacity-100 drop-shadow-lg' : 'opacity-20 grayscale scale-90'}`}>
      {!textRight && (
        <div className={`w-16 h-16 ${isSky ? 'bg-sky-500' : 'bg-yellow-500'} rounded-[1.5rem] flex items-center justify-center shadow-xl border-4 border-white/20`}>
            <User size={32} className={!isSky ? 'text-blue-900' : 'text-white'} />
        </div>
      )}
      <div className={textRight ? 'text-right' : 'text-left'}>
        <p className={`text-xs font-black uppercase tracking-widest mb-2 ${isSky ? 'text-sky-300' : 'text-yellow-300'}`}>{name}</p>
        <p className="text-4xl font-black text-white leading-none tracking-tighter">{itemCount}</p>
      </div>
      {textRight && (
        <div className={`w-16 h-16 ${isSky ? 'bg-sky-500' : 'bg-yellow-500'} rounded-[1.5rem] flex items-center justify-center shadow-xl border-4 border-white/20`}>
            <User size={32} className={!isSky ? 'text-blue-900' : 'text-white'} />
        </div>
      )}
    </div>
  );
}

function ConjugationCard({ title, data, color }: any) {
  const isSky = color === 'sky';
  return (
    <div className="bg-blue-950/80 backdrop-blur-xl border-4 border-sky-400/20 p-8 rounded-[3rem] shadow-2xl">
      <h3 className={`text-3xl font-black italic uppercase mb-8 border-b-4 pb-4 ${isSky ? 'text-sky-400 border-sky-400/30' : 'text-yellow-400 border-yellow-400/30'}`}>{title}</h3>
      <div className="space-y-3">
        {data.map((item: any, i: number) => (
          <div key={i} className="flex justify-between items-center p-5 bg-black/30 rounded-2xl border border-white/5 group hover:bg-yellow-500/10 transition-colors">
            <span className="font-bold text-white/40 uppercase text-xs tracking-widest">{item.subject}</span>
            <span className={`text-2xl font-black tracking-tight ${isSky ? 'text-sky-300' : 'text-yellow-400'}`}>{item.conjugation}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlayerBasket({ player, items, active, color }: any) {
  const isSky = color === 'sky';
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: isSky ? -30 : 30 }}
      animate={{ opacity: active ? 1 : 0.2, x: 0, scale: active ? 1 : 0.95 }}
      className={`p-10 rounded-[3.5rem] border-4 relative overflow-hidden transition-all duration-500 ${active ? 'bg-blue-950 border-yellow-500/50 shadow-2xl' : 'bg-black/20 border-white/5 shadow-inner'}`}
    >
      <div className="flex items-center gap-4 mb-8">
         <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSky ? 'bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.4)]' : 'bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)]'}`}>
            <User size={24} className={!isSky ? 'text-blue-900' : 'text-white'} />
         </div>
         <span className={`text-xl font-black uppercase italic tracking-widest ${isSky ? 'text-sky-400' : 'text-yellow-400'}`}>{player}</span>
      </div>
      
      {/* Visual Basket */}
      <div className="relative h-48 bg-black/40 rounded-[2rem] border-2 border-white/5 flex flex-col justify-end p-6 group">
         <div className="flex flex-wrap gap-4 justify-center">
            <AnimatePresence>
               {items.length === 0 ? (
                 <div className="text-white/10 italic text-sm text-center py-10 flex flex-col items-center gap-3">
                    <ShoppingBasket size={48} />
                    <span>Կորզինկան դատարկ է</span>
                 </div>
               ) : (
                 items.map((it: string, i: number) => (
                   <motion.div 
                      key={i} 
                      initial={{ scale: 0, y: -50 }} 
                      animate={{ scale: 1, y: 0 }}
                      className="text-4xl bg-blue-900/50 p-4 rounded-2xl shadow-xl border border-white/10 flex items-center justify-center hover:scale-110 transition-transform"
                   >
                      {it.split(' ')[0]}
                   </motion.div>
                 ))
               )}
            </AnimatePresence>
         </div>
         
         {/* Basket Handle/Body overlay decoration */}
         <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-t-8 border-yellow-500/10 rounded-[2rem]" />
         <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <ShoppingBasket size={32} className={`opacity-20 ${isSky ? 'text-sky-400' : 'text-yellow-500'}`} />
         </div>
      </div>
    </motion.div>
  );
}

function FinalResult({ player, score, inventory, color }: any) {
  const isSky = color === 'sky';
  return (
    <div className="flex-1 bg-blue-950/80 backdrop-blur-2xl p-10 rounded-[4rem] border-4 border-white/5 shadow-3xl text-center">
       <p className="text-sm font-black uppercase text-white/30 tracking-widest mb-4">{player}</p>
       <p className={`text-8xl font-black italic mb-10 ${isSky ? 'text-sky-400' : 'text-yellow-400'}`}>{score}</p>
       <div className="flex flex-wrap justify-center gap-4 py-8 border-t border-white/5 mt-auto">
          {inventory.map((icon: string, j: number) => (
             <motion.span 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ delay: j * 0.1 }}
              key={j} 
              className="text-4xl bg-black/40 w-20 h-20 flex items-center justify-center rounded-[1.5rem] shadow-inner border border-white/5"
             >
                {icon.split(' ')[0]}
             </motion.span>
          ))}
       </div>
    </div>
  );
}

