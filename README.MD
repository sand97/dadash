<h1>Dadash</h1>
<p>A ClI to manage easily with Redux and Http service structure</p>

<p>in the src folder of your project create is don't exist a store structure based on store 
<a>example</a>
</p>

<h2>I. Installation</h2>
git clone https://gitlab.com/speading_traking/react-cli.git dadash<br/>
cd dadash <br/>
npm install<br/>
npm install -g .<br/>

<h2>II. Usage</h2>
<h3>Help</h3>
dadash --help<br/>
dadash make --help<br/>
dadash make reducer --help<br/>
...

<h3>1-Create reducer</h3>
In the root of your projet, exec <br/>
dadash make reducer --name Calendar<br/>
this will create CalendarReducer

<h3>2-Create action in reducer</h3>
In the root of your projet, exec<br/>
dadash make action --name SET_EVENT_LIST --reducer Calendar<br/>
this will create setListEventsAction action<br/>
<b>NB: please respect uppercase in event name</b>
<h3>3-Create service</h3>
Coming soon

<h3>4-Create request in service</h3>
Coming soon
