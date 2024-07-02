import AddEnglish from "../components/AddEnglish";
import Card from "../components/Card";
let englishList = [
    {
        english: "apple",
        chinese: "蘋果",
    },
    {
        english: "banana",
        chinese: "香蕉",
    },
    {
        english: "car",
        chinese: "車子",
    },
    {
        english: "desk",
        chinese: "桌子",
    },
    {
        english: "ear",
        chinese: "耳朵",
    },
    {
        english: "earkofkggfjoijj",
        chinese: "耳朵、測試、不知道、安安安",
    },
    {
        english: "ear",
        chinese: "耳朵",
    },
    {
        english: "ear",
        chinese: "耳朵",
    },
];

export default function List() {
    return (
        <>
            <section>
                <AddEnglish />
                <div className="list">
                    {englishList.map((v, i) => {
                        return (
                            <Card
                                key={i}
                                english={v.english}
                                chinese={v.chinese}
                            />
                        );
                    })}
                </div>
            </section>
        </>
    );
}
