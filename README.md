stargazer
=========

![Stargazer](https://raw.githubusercontent.com/arekkas/stargazer/master/stargazer.png "Stargazer")

\>\> [**Play now!**](http://arekkas.github.io/stargazer/app) \<\<

Works best on **Chrome**. And on your touch pad / mobile as well!

## HOW TO PLAY

* Press **space**, hit the mouse or tap to jump. You need fuel to jump. To recharge, stop jumping and wait for a amount of time.
* Press **M** to mute/unmute the music.
* **Obstacles** spawn randomly. The longer you survive, the faster and more often they spawn.
* **Upgrades** are *green* and *blue stars*, which spawn randomly as well. The longer you survive, the more frequently they spawn.
  * *Green star*: Fuels up jet pack and gives between 50 and 100 extra points.
  * *Blue star*: Gives between 1000 and 2000 extra points.
* If you reach the top, you will lose all your velocity and all your fuel. So don't.

## Soundscore

If you're interested in the Cubase Project, please let me know.

## Changes

**0.0.3**
* Fixed a bug where gravity was not frame-independent
* Music is now mutable (press m)
* Improved algorithm calculating obstacle frequency
* Improved algorithm calculating obstacle velocity
* Improved algorithm calculating upgrade frequency
* Balance:
  * Increased laser probability
  * Reduced volcano probability

**0.0.2**
* If the player hits the upper border, he will lose all velocity and all his fuel
* Balance:
  * Recharge delay decreased
  * Recharge length decreased
  * Upgrades now spawn *more frequently as time passes by*
* Fixed a bug where the speed increased suddenly instead of steadily
* Removed pause menu (play or die)
* Instead of listening to keyUp, we now listen on keyDown (this confused some people)
* You can now use your mouse to jump as well
* Stargazer is now *mobile friendly*
* Green stars now give extra points

**0.0.1**
Initial release

## Contribute

* cd project_root/
* npm install
* bower install
* grunt dev
* [localhost:9001](http://localhost:9001)
