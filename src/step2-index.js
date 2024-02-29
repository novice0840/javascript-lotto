/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
/* eslint-disable*/
import './styles/reset.css';
import './styles/style.css';
import LottoMachine from './domain/lottoMachine';
import { validateCost } from './utils/validation.js';
import Lotto from './domain/lotto.js';
import WinningLotto from './domain/winningLotto.js';

const $buyForm = document.querySelector('.buy-form');
const $lottoResult = document.querySelector('.lotto-result');
const $answerForm = document.querySelector('.answer-form');
const $lottoResultLabel = document.querySelector('.lotto-result-label');
const $lottoNumbers = document.querySelector('.lotto-numbers');
const $modalCancel = document.querySelector('.modal-cancle');
const $retryButton = document.querySelector('.retry-button');
const $modal = document.querySelector('.modal');

$buyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const money = Number(formData.get('buy-input'));

  let lottoMachine;
  try {
    lottoMachine = new LottoMachine(money);
    validateCost(money);
  } catch (error) {
    alert(`${error.message}`);
    return;
  }

  $lottoResult.classList.remove('hidden');
  $answerForm.classList.remove('hidden');

  $lottoResultLabel.innerText = `총 ${lottoMachine.getLottoCount}개를 구매하였습니다.`;

  lottoMachine.getLottoNumbers.forEach((lottoNumber) => {
    const lottoTag = document.createElement('div');
    lottoTag.textContent = ` 🎟️ ${lottoNumber.join(',')}`;
    lottoTag.classList.add('lotto-number');
    $lottoNumbers.appendChild(lottoTag);
  });

  disableForm($buyForm);
});

$answerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const answerNumbers = formData.getAll('answer-number').map((number) => Number(number));
  const bonusNumber = Number(formData.get('bonus-number'));

  try {
    const answerLotto = new Lotto(answerNumbers);
    const winningLotto = new WinningLotto(answerLotto, bonusNumber);
    console.log({ winningLotto: winningLotto.getLottoNumbers, bonusNumber: winningLotto.getBonusNumber });
  } catch (error) {
    alert(`${error.message}`);
  }

  // disableForm($answerForm);
});

$modalCancel.addEventListener('click', () => {
  console.log('modal click');
});

$retryButton.addEventListener('click', () => {
  console.log('retry button');
  $modal.classList.add('hidden');
  ableForm($buyForm);
  ableForm($answerForm);
});

const disableForm = (formElement) => {
  for (let i = 0; i < formElement.length; i++) {
    formElement.elements[i].disabled = true;
  }
};

const ableForm = (formElement) => {
  for (let i = 0; i < formElement.length; i++) {
    formElement.elements[i].disabled = false;
  }
};
