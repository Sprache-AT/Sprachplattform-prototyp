import author from './assets/author.png';
import image1 from './assets/image1.png';
import image2 from './assets/image2.png';
import image3 from './assets/image3.jpg';
import image4 from './assets/image4.png';
import { FaAngleLeft } from 'react-icons/fa6';

export default function Article() {
  return (
    <div className='text-left flex gap-4'>
      <article className='w-3/4 bg-white shadow-md sm:rounded-lg p-7'>
        <p className='text-gray-500 cursor-pointer hover:text-pink-600'>
          <FaAngleLeft className='inline ' /> zurück zu den Artikeln
        </p>
        <div className='pb-6 border-b-2 border-gray-300 mb-8'>
          <h1 className='font-bold text-4xl text-gray-700 mb-5'>
            Haube/Mütze/Kappe
          </h1>
          <div className='flex items-center'>
            <img
              width='64'
              height='64'
              className='h-16 w-16 rounded-full mr-4'
              src={author}
              alt='Author image'
            />
            <div>
              <div className='text-gray-600'>
                von <span className='font-bold'>Agnes Kim</span>
              </div>
              <div className='text-gray-600'>
                veröffentlicht am <span className='font-bold'>01.05.2024</span>
              </div>
            </div>
          </div>
        </div>
        <section className='nuxt-content max-w-5xl'>
          <p>
            Als Bezeichnung für eine ‚wollene/gestrickte Kopfbedeckung‘ sind im
            Gegenwartsdeutschen verschiedene Lexeme gebräuchlich, wobei die
            Varianten Haube, Mütze und Kappe in der hier vorgestellten,
            österreichweiten Befragung die häufigsten Nennungen auf sich
            vereinen.
          </p>
          <h3 id='ch1'>1. Lexikographische Befunde zu den Varianten</h3>
          <p>
            Lexikographische Nachschlagewerke lassen folgende Rückschlüsse auf
            die drei häufigsten Varianten in unseren Daten zu:
            <br />
            <br />
            Haube ist als Bezeichnung für die abgebildete gestrickte
            Kopfbedeckung als standardsprachliche Variante Österreichs
            ausgewiesen, was etwa durch das Aufscheinen in Kodizes zur
            österreichischen Standardsprache (s. Ebner 2019: „Haube“) bzw. durch
            metasprachliche Hinweise wie „österreichisch“ in anderen
            Wörterbüchern (s. Duden 2019: „Haube“; VWB 2016: „Haube“) abzuleiten
            ist. Mütze scheint hingegen standardsprachlich als „gemeindeutsch“
            eingestuft werden (s. VWB 2016: „Mütze“). Kappe weicht insofern von
            den beiden anderen Bezeichnungen ab, als der Ausdruck in der hier
            relevanten Bedeutung ‚wollene Kopfbedeckung‘ lediglich für die
            Deutschschweiz und den Westen Österreichs standardsprachlichen
            Status hat (s. VWB 2016: „Kappe“), während Kappe in anderen Regionen
            Österreichs eher als standardsprachliche Bezeichnung für eine
            ‚Kopfbedeckung mit Schirm‘ gebräuchlich ist (s. ÖWB 2022: „Kappe“).
            <br />
            <br />
            Im Non-Standard sieht das Variationsverhältnis leicht abweichend
            aus: Der Deutsche Wortatlas (s. DWA: „Mütze“) gibt Einblick in die
            (historische) Variation von Mütze/Haube/Kappe auf der dialektalen
            Ebene in der Mitte des 20. Jahrhunderts und zeigt, dass die
            österreichische Dialektlandschaft um 1940 von zwei zentralen
            Varianten geprägt ist: In weiten Teilen der mittelbairischen
            Regionen Österreichs stellt Haube die häufigste Dialektvariante dar,
            wobei (besonders in Form von Doppenennungen) auch Kappe verbreitet
            ist. Demgegenüber vermerkt der DWA Kappe in den südbairischen (v.a.
            Tirol und Kärnten) sowie alemannischen (v.a. Vorarlberg) Gebieten
            Österreichs sowie auch im (mittelbairischen) Burgenland als Variante
            mit der höchsten Belegdichte (s. DWA: „Mütze“). Insbesondere im
            südbairischen Kärnten ist aber neben Kappe auch Haube in vielen
            Ortspunkten belegt. In den Regionen Ober- und Niederösterreichs
            sticht zudem die häufige Nennung von Komposita (z.B. Pudelhaube) ins
            Auge.
            <br />
            <br />
            Über den Gebrauch der Varianten im mittleren Bereich
            („Umgangssprache“ im diesem Artikel zugrundeliegenden Fragebogen)
            gibt der Atlas zur deutschen Alltagssprache Auskunft (s. AdA:
            „Strickmütze“). Die Karte des AdA deckt sich insofern mit der
            historischen Dialektkarte (s. DWA: „Mütze“), als dass Haube als
            häufigste Variante in weiten Teilen Österreichs ausgewiesen wird,
            Kappe dagegen im (größtenteils) südbairischen Tirol und
            alemannischen Vorarlberg die meisten Belege vereint. Ein
            Nebeneinander von Haube und Kappe, wie es im DWA durchaus noch
            häufig aufscheint, ist im AdA aber lediglich noch für das
            südbairische Kärnten belegt. Eine zweite Karte des AdA zu
            Kompositabildungen der Variable (s. AdA: „Bommelmütze“)
            unterstreicht diese Verteilung im mittleren Register.
            <br />
            <br />
            Die in den Kodizes als gemeindeutsch ausgewiesene Variante Mütze
            spielt zumindest gemäß DWA und AdA in den Non-Standard-Registern
            Österreichs kaum eine Rolle.
          </p>
          <h3 id='ch2'>2. Erhebungsmethoden und Datenbasis</h3>
          <figure>
            <img src={image1} alt='Blog post image' />
            <figcaption>Abbildung 1 Bildstimulus im Fragebogen</figcaption>
          </figure>
          <span>
            Aufgabentyp: Benennungsaufgabe mit Bildstimulus
            <br />
            Anzahl an Teilnehmer:innen an der Befragung: 1.883 Personen
            <br />
            Erhebungszeitraum: Mai 2021 bis Mai 2023
            <br />
            <br />
            <ul>
              Anzahl an relevanten Bezeichnungen, die pro Register genannt
              wurden:
              <li>„Dialekt/Mundart“: 919</li>
              <li>„Umgangssprache“: 936 </li>
              <li>„Hochdeutsch“: 1.859</li>
            </ul>
            Die Abweichung von der Gesamtteilnehmerzahl ergibt sich durch 4
            irrelevante Angaben, 156 leer gelassene Antwortfelder sowie 106
            Mehrfachnennungen (z. B. „Kappe oder Haube“).
          </span>
          <h3 id='ch3'>3. Ergebnisse</h3>
          <h4 id='ch31'>3.1. Dialekt</h4>
          <figure>
            <img src={image2} alt='Blog post image' />
            <figcaption>Abbildung 2 Haube/Mütze - Dialekt</figcaption>
          </figure>
          <p className=' mb-6'>
            Die in Abschnitt 2 beschriebene (historische) Dialektsituation zur
            untersuchten Variable scheint bis in die Dialekte der Gegenwart
            (Erhebungszeitraum 2021-2023) weitestgehend fortzubestehen, mit
            Haube und Kappe als häufigste Dialektvarianten in weitestgehend klar
            abgetrennten Regionen/Arealen. Das deuten zumindest die Angaben der
            Fragebogenteilnehmer:innen für das Register „Dialekt/Mundart“ an.
            Haube stellt dabei die Dialektvariante mit den meisten Belegen im
            gesamten mittelbairischen Raum sowie im süd-mittelbairischen
            Übergangsgebiet dar. Auffallend ist auch das wiederholte Aufscheinen
            von Kompositaformen mit -haube im mittelbairischen Gebiet,
            insbesondere Pudelhabe, was ebenfalls bereits in den historischen
            DWA-Daten festgestellt wurde. Grundsätzlich legt der verwendete
            Bildstimulus ein vermehrtes Auftreten von Kompositabildungen
            insofern nahe, als dass die abgebildete Haube/Kappe eine Verzierung
            in Form eines Bommels aufweist (s. Abschnitt 3). Trotz des identen
            Bildstimulus fehlen aber außerhalb des mittelbairischen Raumes
            Kompositaformen nahezu völlig, selbst im süd-mittelbairischen
            Übergangsgebiet, wo Haube die Variante mit den meisten Belegen
            darstellt.
            <br />
            <br />
            Was die in den historischen DWA-Karten belegten Kappe-Regionen um
            die Mitte des 20. Jh. betrifft (s. DWA: „Mütze“), scheint zumindest
            in Vorarlberg und Tirol die Verwendung der Variante Kappe dialektal
            stabil. Im südbairischen Kärnten herrscht ein Nebeneinander von
            Haube- und Kappe-Belegen. Diese Verteilung wird bereits im DWA
            angedeutet, wenn auch in den historischen Daten Kärnten noch
            eindeutig Kappe als Variante mit den meisten Nennungen notiert war.
            Lediglich im Burgenland, für das der DWA ebenfalls Kappe als
            häufigste Variante vermerkt hat, wurde Kappe weitestgehend von Haube
            ersetzt, wobei sich noch vereinzelt Kappe-Belege finden, die auf die
            frühere Verbreitung in österreichischen Dialekten hindeuten.
            <br />
            <br />
            Mütze-Belege finden sich in den Dialektdaten nur vereinzelt, wobei
            Mütze im alemannischen Vorarlberg zumindest noch häufiger auftritt
            als Haube.
          </p>
          <h4 id='ch32'>3.2. Umgangssprache</h4>
          <figure>
            <img src={image3} alt='Blog post image' />
            <figcaption>Abbildung 3 Haube/Mütze - Umgangssprache</figcaption>
          </figure>
          <p>
            Betrachtet man die Angaben der Teilnehmer:innen zur
            „Umgangssprache“, finden sich im Gebiet um Niederösterreich und Wien
            nun vermehrt Belege für Mütze, während diese Variante im
            Dialektregister noch keine Rolle gespielt hat. Für einige urbane
            Zentren (v.a. Innsbruck, Salzburg und Klagenfurt) lässt sich die
            häufigere Nennung von Mütze ebenfalls feststellen. Generell wählt
            jedoch der Großteil der Personen, die angeben keinen Dialekt zu
            sprechen (siehe Abschnitt 3), dieselben Bezeichnungen wie die
            Dialektsprecher aus den gleichen Regionen, was sich beispielsweise
            auch im hohen Anteil an Kompositaformen im mittelbairischen Gebiet
            äußert, der bereits im Dialektregister aufgefallen ist.
          </p>
          <h4 id='ch33'>3.3. Standard</h4>
          <figure>
            <img src={image4} alt='Blog post image' />
            <figcaption>Abbildung 4 Haube/Mütze - Hochdeutsch</figcaption>
          </figure>
          <p>
            Aus den für das Register „Hochdeutsch“ eingetragenen Daten der
            Fragebogenteilnehmer:innen lassen sich folgende Thesen für die
            standardsprachlichen Register ableiten:
            <br />
            <br />
            Österreichweit lässt sich im Vergleich zum Non-Standard (s. Abb. 2
            und 3) eine deutliche Zunahme von Mütze-Belegen feststellen (41,76 %
            aller Belege inklusive Kompositaformen mit -mütze gegenüber 3,56 %
            im Dialekt bzw. 18,65 % in der Umgangssprache). Während Haube in den
            mittelbairischen Bundesländern die häufigste Bezeichnung für die
            Variable darstellt, überwiegen im südbairischen Tirol sowie auch im
            alemannischen Vorarlberg Mütze-Belege über (die im Non-Standard klar
            am häufigsten genannte) Kappe. Letztere Variante scheint zwar
            weiterhin auf, stellt aber im Standard die unüblichere Variante dar.
            In Vorarlberg finden sich zudem im Standard auch Belege für Haube,
            während die Variante im Non-Standard bis auf vereinzelte Nennungen
            keine Rolle spielt (siehe Abbildung 2). Bemerkenswert ist außerdem
            das Bild, das die Ergebnisse der Erhebung in Kärnten zeichnen:
            Während im dialektalen Register ein Nebeneinander von Kappen- und
            Hauben-Belegen aufscheint und im mittleren Bereich Haube einen
            Großteil der Nennungen ausmacht, stellt im standardsprachlichen
            Register Mütze die Variante mit den meisten Belegen dar. In diesem
            Gebiet scheinen demnach gemäß der Kärtner Teilnehmer:innen alle drei
            Varianten verbreitet zu sein, wobei klare Unterschiede in Bezug auf
            die Registerzuordnung bestehen.
            <br />
            <br />
            Kompositaformen mit -mütze finden sich insbesondere in Ober- und
            Niederösterreich, d.h. in jenen Regionen, wo im Non-Standard (und in
            geringerem Umfang auch im Standard) auch vermehrt Kompositabildungen
            mit -haube belegt sind.
          </p>
          <h3 id='ch4'>4. Weiterführende Links</h3>
          <ul>
            <li>
              <a>Fragebogenaufbau - detailliert</a>
            </li>
            <li>
              <a>Kartierungstool </a>
            </li>
            <li>
              <a>Übersicht über andere Items</a>
            </li>
            <li>
              <a>
                Lexik-Publikationen aus dem SFB, insbesondere Lenz/Höll/Ziegler
                2023
              </a>
            </li>
          </ul>

          <h3 id='ch5'>5. Literatur</h3>
          <ol>
            <li>
              AdA = Elspaß, Stephan/Möller, Robert (2003 ff.): Atlas zur
              deutschen Alltagssprache (AdA).{' '}
              <a href='https://www.atlas-alltagssprache.de' target='_blank'>
                https:// www.atlas-alltagssprache.de
              </a>
              .
            </li>
            <li>
              Duden-Universal 2019 = Dudenredaktion (Hg.) (2019): Duden.
              Deutsches Universalwörterbuch. 9., vollständig überarbeitete und
              erweiterte Aufl. Berlin.
            </li>
            <li>
              DWA = Mitzka, Walther/Schmitt, Ludwig Erich [ab Bd. 5] (Hgg.)
              (1951-1980): Deutscher Wortatlas
            </li>
            <li>
              DWDS = Berlin-Brandenburgischen Akademie der Wissenschaften (Hg.):
              Digitales Wörterbuch der deutschen Sprache. Das
              Wortauskunftssystem zur deutschen Sprache in Geschichte und
              Gegenwart.{' '}
              <a href='https://www.dwds.de/' target='_blank'>
                https://www.dwds.de/
              </a>
              .
            </li>
            <li>
              Ebner, Jakob (2019): Österreichisches Deutsch. Wörterbuch der
              Gegenwartssprache in Österreich. Berlin.
            </li>
            <li>
              Lenz, Alexandra N./Höll, Jan/Ziegler, Theresa (2023): Lexikalische
              Variation in Österreich. Ausgewählte Austriazismen im
              Stadt-Land-Vergleich. In: Muttersprache 133/1-2, 82-115.
            </li>
            <li>
              ÖWB 2022 = Österreichisches Bundesministerium für Bildung (Hg.)
              (2022): Österreichisches Wörterbuch. 44. Aufl., vollständige
              Ausgabe mit dem amtlichen Regelwerk. Wien.
            </li>
          </ol>
        </section>
      </article>
      <aside className='w-1/4 self-start sticky top-8 bg-white shadow-lg rounded-lg p-7'>
        <div className=''>
          <div className='uppercase font-bold pb-2 text-gray-600'>
            Inhaltsverzeichnis
          </div>
          <ol>
            <li>
              <a href='#ch1'>1. Lexikographische Befunde zu den Varianten</a>
            </li>
            <li>
              <a href='#ch2'>2. Erhebungsmethoden und Datenbasis</a>
            </li>
            <li>
              <a href='#ch3'>3. Ergebnisse</a>
            </li>
            <li className='sub'>
              <a href='#ch31'>3.1. Dialekt</a>
            </li>
            <li className='sub'>
              <a href='#ch32'>3.2. Umgangssprache</a>
            </li>
            <li className='sub'>
              <a href='#ch33'>3.3. Standard</a>
            </li>
            <li>
              <a href='#ch4'>4. Weiterführende Links</a>
            </li>
            <li>
              <a href='#ch5'>5. Literatur</a>
            </li>
          </ol>
        </div>
      </aside>
    </div>
  );
}
