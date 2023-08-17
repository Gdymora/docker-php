<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

class CheckStatusAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::user() && Auth::user()->isAdministrator()){
            return $next($request);//запрос передается дальше
        } else {
            return redirect('/');
        }
        
    }
}
