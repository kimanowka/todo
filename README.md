# ДЗ №6

## Необходимо написать TODO List. Приложение должно быть написано на TypeScript с использованием таких библиотек как React JS.А так же подключить предоставляемое API.

    Приложение должно иметь интерфейс для добавления новой задачи в список дел – поле для ввода текста и копка либо иконка по нажатию на которую задача добавляется в список дел. Поле ввода ограниченно 160 символами. При превышении этого лимита, под полем отображается ошибка – превышен лимит текста задачи на X символов. Ошибка должна корректироваться по мере изменения текста в поле.
    Так же на одном экране должен выводится список ранее добавленных дел. Задача из списка дел представляет из себя текст самой задачи и меню.

Возле каждой задачи в списке дел должна находиться иконка меню, по нажатию на которую должен появится поп-ап с такими пунктами меню:
В избранное / Убрать из избранного (в зависимости от текущего состояния рендериться меню с тем или иным действием)
Выполненно / Вернуть в работу (в зависимости от текущего состояния рендериться меню с тем или иным действием)
Редактировать
Удалить

При добавлении задачи в Избранное – возле задачи должна появляться иконка звездочки. Нажатие на неё должно дублировать поведение нажатия пункта меню – «Убрать из избранного». После чего иконка со звездочкой пропадает.
При выборе пункта меню выполнено – необходимо как-то визуально (на ваш вкус) выделить что данная задача пометилась как выполненная. Аналогичным образом должны отличаться задачи которые находятся в работе.
При выборе пункта меню «Редактировать» - текст задачи должен замениться на поле с введенным в него уже редактируемым текстом дополнительно данное поле должно стать в фокусе – пользователь может сразу приступить к редактированию текста без дополнительных действий с компьютерной мышью. Изменения в тексте должны примениться только после нажатия клавиши Enter.
При выборе меню «Удалить» должно появляться модальное окно с текстом «Вы действительно хотите удалить задачу?». Под этим вопросом должен находиться блок с текстом удаляемой задачи, а под ним дата создания задачи. Ниже должны находиться кнопки управления. Слева – Отмена (закрывает модальное окно «Удалить задачу»), справа – «Да, удалить». По нажатию на которую мы подтверждаем действие, после которого задача удаляется из списка дел. Так же модальное окно должно иметь справа вверху иконку закрыть, нажатие на которую должно закрывать нашу модалку «Удалить задачу».
Поп-ап меню должно закрываться по клику мыши вне блока самого Поп-ап меню а так же при выборе любого пункта меню.

Приложение так же должно иметь 3 фильтра по нажатию на который должны отображаться те или иные задачи. Фильтр в активном режиме должен стилистически выделяться, отличаясь от неактивного.
Выполненные задачи (выполненные + выполненные в и избранном)
Задачи в работе (в работе + в работе и в избранном)
Избранные задачи (только те которые одновременно являются и избранными и в работе)

Одновременно может быть активен максимум только один фильтр. При отключенных фильтрах выводятся все задачи в списке.

    Все изменения в списке дел должны синхронизироваться с Базой Данных путем отправки запросов по предоставленному API.

Дополнительное задание (на дополнительные баллы). Обрабатываемые ошибки с сервера вывести пользователю на UI. Рекомендуется это делать с помощью всплывающего окна справа внизу окна браузера. Окно должно само пропадать через 15 секунд или по клику на иконку «Закрыть».

    Приложение должно выглядеть презентабельным, с аккуратным и удобным UX/UI для пользователя. Так же аккуратным и хорошо структурированным должен быть и код.
