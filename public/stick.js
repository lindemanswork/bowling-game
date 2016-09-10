/*
Moving Stick Figure Javascript file

Copyright 2010 Jeffri Hong

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

jQuery.fn.stick = function()
{
	var st = jQuery(this);
	var lh = st.find('.lefthand');
	var rh = st.find('.righthand');
	var lf = st.find('.leftfoot');
	var rf = st.find('.rightfoot');
	var active = false;

	function walk( step, call )
	{
		if ( active == true )
			return;
		else
			active = true;
		if ( step > 0 )
		{
			movepart( st );
			st.animate({
				left: '+=50'
			}, 1000, function(){
				active = false;
				walk(step-1, call);
			});
		}
		else if ( step < 0 )
		{
			movepart( st );
			st.animate({
				left: '-=50'
			}, 1000, function(){
				active = false;
				walk(step+1, call);
			});
		}
		else
		{
			active = false;
			if ( typeof(call) != "undefined" )
				call();
		}
	}

	function movepart( obj, call )
	{
		obj.addClass('walk1');
		setTimeout(function(){
			obj.removeClass('walk1').addClass('walk2');
		}, 500);
		setTimeout(function(){
			obj.removeClass('walk2');
			if ( typeof(call) != 'undefined' )
				call();
		}, 1000);
	}
	return {'walk':walk};
}

