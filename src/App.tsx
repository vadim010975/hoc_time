import "./App.css";

type VideoProps = {
  url: string,
  date: string,
}

type VideoListProps = {
  list: VideoProps[],
}

type DateTimeProps = {
  date: string,
}

function DateTime(props: DateTimeProps) {
  return (
    <p className="date">{props.date}</p>
  )
}

function withData<T extends DateTimeProps>(Component: React.ComponentType<T>) {

  const WithData = (props: DateTimeProps) => {

    const days = Math.trunc((Date.now() - new Date(props.date).getTime()) / (1000 * 60 * 60 * 24));
    let date, hours;
    if (days >= 1) {
      date = `${days} дней назад`;
    } else {
      hours = Math.trunc((Date.now() - new Date(props.date).getTime()) / (1000 * 60 * 60));
      if (hours < 1) {
        date = "12 минут назад";
      } else {
        date = "5 часов назад";
      }
    }

    return (
        <Component {...props as T} date = {date}/>
    );
  }

  return WithData;
}

const DateTimePretty = withData(DateTime);

function Video(props: VideoProps) {
  return (
    <div className="video">
      <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      <DateTimePretty date={props.date} />
    </div>
  )
}

function VideoList(props: VideoListProps) {
  return props.list.map((item, key) => <Video url={item.url} date={item.date} key={key} />);
}

export default function App() {
  const list = [
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-07-31 13:24:00'
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2024-03-07 16:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00'
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-01 16:17:00'
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00'
    },
  ];

  return (
    <VideoList list={list} />
  );
}

