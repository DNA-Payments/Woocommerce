<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitdc1ae1d6b42196f55c59c007e433da7c
{
    public static $prefixLengthsPsr4 = array (
        'D' => 
        array (
            'DNAPayments\\' => 12,
        ),
        'C' => 
        array (
            'Composer\\Installers\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'DNAPayments\\' => 
        array (
            0 => __DIR__ . '/..' . '/dna/dnapayments-sdk-php/lib',
        ),
        'Composer\\Installers\\' => 
        array (
            0 => __DIR__ . '/..' . '/composer/installers/src/Composer/Installers',
        ),
    );

    public static $prefixesPsr0 = array (
        'R' => 
        array (
            'Requests' => 
            array (
                0 => __DIR__ . '/..' . '/rmccue/requests/library',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitdc1ae1d6b42196f55c59c007e433da7c::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitdc1ae1d6b42196f55c59c007e433da7c::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInitdc1ae1d6b42196f55c59c007e433da7c::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}
