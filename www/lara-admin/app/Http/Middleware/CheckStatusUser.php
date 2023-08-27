<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

class CheckStatusUser
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
        if(Auth::user() && (Auth::user()->isUser()=='user')){
            return $next($request);//запрос передается дальше
        }else {
            return redirect('/');
        }
    }
}
