import { Selector, ClientFunction, Role } from 'testcafe';

fixture`login`.page`https://hungry-tereshkova-7ccef7.netlify.app/`;

const testUser = Role("https://hungry-tereshkova-7ccef7.netlify.app/", async t => {
    await t
    .typeText("#email", "user2@email.com")
    .typeText("#password", "password2")
    .click("#login_btn");
});

test("successful login", async t => {
    const getLocation = ClientFunction(() => document.location.href);
    await t
        .typeText("#email", "user1@email.com")
        .typeText("#password", "password1")
        .click("#login_btn")
        .expect(getLocation()).contains("https://hungry-tereshkova-7ccef7.netlify.app/map.html");
});

test("unsuccessful login#1", async t => {
    await t
        .typeText("#email", "kevin@email.com")
        .typeText("#password", "password1")
        .click("#login_btn")
        .expect(Selector("#warning").innerText).eql("Login fehlgeschlagen.");
});

test("unsuccessful login#2", async t => {
    await t
        .typeText("#email", "kevin@email.com")
        .click("#login_btn")
        .expect(Selector("#warning").innerText).eql("Login fehlgeschlagen.");
});

test("unsuccessful login#3", async t => {
    await t
        .typeText("#email", "user1@email.com")
        .typeText("#password", "asdf")
        .click("#login_btn")
        .expect(Selector("#warning").innerText).eql("Login fehlgeschlagen.");
});

test("unsuccessful login#4", async t => {
    await t
        .click("#login_btn")
        .expect(Selector("#warning").innerText).eql("Login fehlgeschlagen.");
});

fixture`trips`.page`https://hungry-tereshkova-7ccef7.netlify.app/edittrip.html`;

const landSelect = Selector("#land_list");
const landOption = landSelect.find("option");

test("successful add and delete", async t => {
    var rows = Selector("table tr").count;

    await t
        .useRole(testUser)
        .typeText("#tripname", "Reise A")
        .click(landSelect)
        .click(landOption.withText("Deutschland"))
        .typeText("#start", "2022-01-24")
        .typeText("#ende", "2022-01-26")
        .click("#create_btn")
        .expect(rows).eql(2)
        .click("#button_del1")
        .expect(rows).eql(1);
});

test("unsuccessful add#1", async t => {  
    var rows = Selector("table tr").count;

    await t
        .useRole(testUser)
        .typeText("#tripname", "Reise A")
        .click(landSelect)
        .click(landOption.withText("Deutschland"))
        .typeText("#start", "2022-01-24")
        .click("#create_btn")
        .expect(rows).eql(1);
});

test("unsuccessful add#2", async t => {
    var rows = Selector("table tr").count;

    await t
        .useRole(testUser)
        .typeText("#tripname", "Reise A")
        .click(landSelect)
        .click(landOption.withText("Deutschland"))
        .typeText("#start", "2022-01-24")
        .typeText("#ende", "2022-01-22")
        .click("#create_btn")
        .expect(rows).eql(1);
});

test("successful edit", async t => {
    var tripname = Selector("table").find("td").nth(0).innerText;

    await t
        .useRole(testUser)
        .typeText("#tripname", "Reise A")
        .click(landSelect)
        .click(landOption.withText("Deutschland"))
        .typeText("#start", "2022-01-24")
        .typeText("#ende", "2022-01-26")
        .click("#create_btn")
        .click("#button1")
        .click("#tripname")
        .pressKey("ctrl+a delete")
        .typeText("#tripname", "Reise B")
        .click("#create_btn")
        .expect(tripname).eql("Reise B")
        .click("#button_del1");
});