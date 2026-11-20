const questions = [
 {icon:"🌊",q:"Волна накатывает на берег. Птенец испугался и хочет убежать. Что ты ему посоветуешь?",a:["Убежать подальше и больше не подходить к воде.","Наблюдать за волнами и попробовать подойти, когда станет спокойнее.","Сразу броситься в воду, не раздумывая."],good:1,why:"Верно! Смелость — не безрассудство. Понять, что тебя пугает, и выбрать безопасный момент — тоже смелый поступок."},
 {icon:"🐚",q:"Птенец потерялся из виду и не знает, где искать еду. Как лучше поступить?",a:["Замереть и ничего не делать.","Попробовать исследовать берег понемногу, запоминая безопасные места.","Убежать как можно дальше, не оглядываясь."],good:1,why:"Отлично! Маленькие шаги помогают освоиться. Не обязательно сразу знать весь путь."},
 {icon:"🪽",q:"Первая попытка не удалась. Птенец расстроился. Что поможет ему?",a:["Решить, что у него никогда не получится.","Сделать вид, что ничего не произошло.","Отдохнуть, понять ошибку и попробовать ещё раз."],good:2,why:"Именно так! Неудача не означает поражение. Она может подсказать, что попробовать в следующий раз."},
 {icon:"🤝",q:"Птенцу страшно одному. Рядом есть тот, кому он доверяет. Что можно сделать?",a:["Попросить поддержки и учиться рядом.","Скрывать страх любой ценой.","Отказаться от своей цели навсегда."],good:0,why:"Здорово! Попросить о помощи — не слабость. Поддержка помогает почувствовать себя увереннее."}
];
let current=0,score=0,answered=false;
const $=id=>document.getElementById(id);
function render(){
 const q=questions[current];answered=false;
 $("step-label").textContent=`ИСПЫТАНИЕ 0${current+1} / 04`;
 $("progress").style.width=`${(current+1)*25}%`;
 $("quiz-icon").textContent=q.icon;$("question").textContent=q.q;
 $("feedback").textContent="";$("next").hidden=true;
 $("next").textContent=current===questions.length-1?"Посмотреть результат →":"Следующее испытание →";
 $("answers").innerHTML="";
 q.a.forEach((answer,i)=>{const b=document.createElement("button");b.className="answer";b.innerHTML=`<span>${String.fromCharCode(65+i)}</span>${answer}`;b.addEventListener("click",()=>choose(i));$("answers").appendChild(b)});
}
function choose(i){
 if(answered)return;answered=true;const q=questions[current];const buttons=[...$("answers").children];
 buttons.forEach((b,index)=>{b.disabled=true;if(index===q.good)b.classList.add("correct");else if(index===i)b.classList.add("wrong")});
 if(i===q.good)score++;
 $("feedback").textContent=(i===q.good?"✓ ":"")+q.why;$("next").hidden=false;
}
$("next").addEventListener("click",()=>{
 if(current<questions.length-1){current++;render();return}
 $("quiz").innerHTML=`<div class="result"><div class="quiz-tag">ТВОЙ РЕЗУЛЬТАТ</div><div style="font-size:48px;margin:18px 0">🌟</div><h3 style="font:800 30px Manrope;margin:0 0 12px">Ты сделал ${score} из 4 шагов!</h3><p style="color:#756b60;line-height:1.7;max-width:520px">Главное испытание — не набрать баллы, а понять: смелость можно тренировать. Каждый раз, когда ты пробуешь что-то новое, ты становишься увереннее.</p><button class="next-button" id="restart">Пройти ещё раз ↻</button></div>`;
 $("restart").addEventListener("click",()=>{current=0;score=0;$("quiz").innerHTML=`<div class="quiz-top"><span id="step-label"></span><span class="quiz-progress"><i id="progress"></i></span></div><div class="quiz-content"><div class="quiz-icon" id="quiz-icon"></div><div><p class="quiz-tag">ТВОЁ РЕШЕНИЕ</p><h3 id="question"></h3><div class="answers" id="answers"></div><p class="feedback" id="feedback" aria-live="polite"></p><button class="next-button" id="next" hidden></button></div></div>`; $("next").addEventListener("click",()=>{if(current<3){current++;render()}else location.reload()});render()});
});
$("promise-btn").addEventListener("click",()=>{$("promise").hidden=false;$("promise-btn").textContent="Шаг сделан ✓";$("promise-btn").disabled=true});
render();
