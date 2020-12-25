import React from 'react';
import '../styles/RootPage.scss';

function RootPage() {
  return(
    <div className="">
      <h1 className="grid-title">
        Чуть-чуть Grid версточки
      </h1>
      <div className="grid">
        <div className="grid-item">
          Причинами революции стали как недееспособность власти, социально-экономические, политические изменения, многие годы накапливавшиеся во французском обществе, так и хозяйственные и политические неурядицы, произошедшие в течение нескольких лет, непосредственно предшествовавших 1789 году.
        </div>
        <div className="grid-item">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        </div>
        <div className="grid-item">
          <h3 className="title">Взятие Бастилии</h3>
          <div className="image-container">
            <img className="image" src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Prise_de_la_Bastille.jpg" />
          </div>
        </div>
        <div className="grid-item">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem
        </div>
        <div className="grid-item">
          Непосредственным толчком к началу революции стали кризис правительственных финансов, вызванный участием Франции в событиях Американской революции; неурожаи и экспорт зерна и вызванные им голод и социальные волнения; негативные последствия торгового договора с Великобританией (1786), открывшего французский рынок для британских товаров.
        </div>
      </div>
    </div>
  );
}

export default RootPage;
