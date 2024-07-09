import Card from "../components/Card";
export default function List({
    children,
    fetching,
    currentEnglishList,
    addImportant,
    deleteEnglish,
}) {
    return (
        <section>
            {children}
            <div className="list">
                {fetching ? (
                    <h3>取得資料中..</h3>
                ) : currentEnglishList.length > 0 ? (
                    currentEnglishList.map((v, i) => {
                        return (
                            <Card
                                key={i}
                                english={v.english}
                                chinese={v.chinese}
                                important={v.important}
                                addImportant={addImportant}
                                deleteEnglish={deleteEnglish}
                            />
                        );
                    })
                ) : (
                    <div className="no-list">
                        <h3>目前無儲存單字</h3>
                        <h3>請點擊上方按鈕新增</h3>
                    </div>
                )}
            </div>
        </section>
    );
}
