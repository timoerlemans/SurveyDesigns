/* This JS script will create a vertical preview of the survey questions */

function createPreview ( questionType, questionObject, questionId ) {
	'use strict';

	const pRoot = document.getElementById('pRoot');

	if (questionType === 1 ) {
		const content1 = document.createElement('div');
		const content2 = document.createElement('div');
		const content3 = document.createElement('span');
		const content4 = document.createElement('div');
		const content5 = document.createElement('input');
		const contentDelete = document.createElement('img');

		content1.id = String(questionId);
		content1.classList.add('previewQuestion');
		content3.textContent = 'Q. ' + questionObject.question;
		content4.textContent = 'A. ';
		content5.placeholder = 'And Your Answer is...';
		contentDelete.src = '../svg/delete.svg';
		contentDelete.title = 'Delete From Preview (Only Available For Creator)';
		contentDelete.qid = content1.id;

		contentDelete.onclick = () => handleDeleteContent(contentDelete.qid);

		content2.appendChild(content3);
		content4.appendChild(content5);
		content1.appendChild(contentDelete);
		content1.appendChild(content2);
		content1.appendChild(content4);


		pRoot.appendChild(content1);

		togglePlaceholderOnClick();

	} else if (questionType === 2 ) {

		const content1 = document.createElement('div');
		const content2 = document.createElement('div');
		const content3 = document.createElement('span');
		const content4 = document.createElement('div');
		const content5 = document.createElement('select');
		const contentDelete = document.createElement('img');

		content1.id = String(questionId);
		content1.classList.add('previewQuestion');
		content3.textContent = 'Q. ' + questionObject.question;
		content4.textContent = 'A. Pick One Of The Following Options: ';
		contentDelete.src = '../svg/delete.svg';
		contentDelete.title = 'Delete From Preview (Only Available For Creator)';
		contentDelete.qid = content1.id;

		content2.appendChild(content3);
		content4.appendChild(content5);
		content1.appendChild(contentDelete);
		content1.appendChild(content2);
		content1.appendChild(content4);

		contentDelete.onclick = () => handleDeleteContent(contentDelete.qid);

		questionObject.options.forEach(
			(option) => {
				const content6 = document.createElement('option');
				content6.textContent = option;
				content6.value = option;
				content5.appendChild(content6);
			}
		)

		pRoot.appendChild(content1);

		togglePlaceholderOnClick();

	} else if (questionType === 3) {
		const content1 = document.createElement('div');
		const content2 = document.createElement('div');
		const content3 = document.createElement('span');
		const content4 = document.createElement('div');
		const contentDelete = document.createElement('img');

		content1.id = String(questionId);
		content1.classList.add('previewQuestion')
		content3.textContent = 'Q. ' + questionObject.question;
		content4.textContent = 'A. Pick One Or More Of The Following Choices: ';
		content4.classList.add('previewCheckbox');
		contentDelete.src = '../svg/delete.svg';
		contentDelete.title = 'Delete From Preview (Only Available For Creator)';
		contentDelete.qid = content1.id;

		content2.appendChild(content3);
		content1.appendChild(contentDelete);
		content1.appendChild(content2);
		content1.appendChild(content4);

		contentDelete.onclick = () => handleDeleteContent(contentDelete.qid);

		questionObject.choices.forEach(
			(choice, i) => {
				const content6 = document.createElement('div');
				const content7 = document.createElement('input');
				content7.type = 'checkbox';
				content7.name = choice;
				content7.value = choice;
				content7.id = choice + i;
				const content8 = document.createElement('label');
				content8.for = choice + i;
				content8.textContent = choice;

				content6.appendChild(content7);
				content6.appendChild(content8);
				content4.appendChild(content6);
			}
		)

		pRoot.appendChild(content1);

		togglePlaceholderOnClick();
	}

	function handleDeleteContent (id) {
		document.getElementById(id).remove();
	}

	function togglePlaceholderOnClick() {

		const Elements = Array.from(document.querySelectorAll('input'));
		let ElementText = []; // An array to store placeholders

		Elements.forEach(function (element) {
			ElementText.push(element.placeholder); // pushing placeholders into the empty array

			element.addEventListener("focusin", function (event) { // Event listener when element is in focus
				element.placeholder = ""; // setting placeholder to nothing

			});

			window.addEventListener("click", function (event) { // Event listener on when element is not in focus
				if (!element.value && event.target !== element) {
					element.placeholder = ElementText[Elements.indexOf(element)]; // retrieving old placeholder and setting it
				}

			});
		});
	}
}